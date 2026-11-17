(() => {
  const db = window.dnaSupabase;
  const $ = (id) => document.getElementById(id);

  const loginPanel = $('loginPanel');
  const dashboard = $('dashboard');
  const loginMessage = $('loginMessage');

  if (!db) {
    if (loginMessage) loginMessage.textContent = 'Supabase connection is missing. Check supabase-config.js.';
    console.error('DNA Dynamic Admin: Supabase client is not available.');
    return;
  }

  const schemas = {
    roster_players: {
      title: 'ROSTER & PROFILES',
      hint: 'Player records',
      pk: 'id',
      cols: ['id', 'gamer_tag', 'real_name', 'role', 'age', 'game_uid', 'experience', 'is_active'],
      fields: [
        ['gamer_tag', 'Gamer tag', 'text'],
        ['real_name', 'Real name', 'text'],
        ['role', 'Role', 'text'],
        ['age', 'Age', 'number'],
        ['game_uid', 'Game UID', 'text'],
        ['experience', 'Experience', 'text'],
        ['bio', 'Biography', 'textarea'],
        ['image_url', 'Image URL', 'url'],
        ['achievements', 'Achievements', 'textarea'],
        ['instagram_url', 'Instagram URL', 'url'],
        ['phone', 'Phone Number', 'tel'],
        ['facebook_url', 'Facebook URL', 'url'],
        ['sort_order', 'Sort order', 'number'],
        ['is_active', 'Active (true/false)', 'text']
      ]
    },
    matches: {
      title: 'MATCHES',
      hint: 'Tournament and match updates',
      pk: 'id',
      cols: ['id', 'tournament_name', 'opponent', 'match_title', 'match_date', 'status', 'result'],
      fields: [
        ['tournament_name', 'Tournament', 'text'],
        ['opponent', 'Opponent', 'text'],
        ['match_title', 'Match title', 'text'],
        ['match_date', 'Match date', 'datetime-local'],
        ['poster_url', 'Poster URL', 'url'],
        ['status', 'Status (upcoming / live / completed)', 'text'],
        ['our_score', 'Our Score', 'text'],
        ['opponent_score', 'Opponent Score', 'text'],
        ['result', 'Result', 'text'],
        ['description', 'Description', 'textarea'],
        ['is_featured', 'Featured (true/false)', 'text']
      ]
    },
    content_posts: {
      title: 'SIGNINGS / POSTS',
      hint: 'Manage signing and farewell announcements',
      pk: 'id',
      cols: ['id', 'title', 'category', 'status', 'is_featured', 'created_at'],
      fields: [
        ['title', 'Title', 'text'],
        ['category', 'Category (signing / farewell)', 'text'],
        ['description', 'Description', 'textarea'],
        ['image_url', 'Image URL', 'url'],
        ['player_id', 'Player ID (optional)', 'number'],
        ['event_date', 'Event date', 'date'],
        ['status', 'Status (draft / published / archived)', 'text'],
        ['is_featured', 'Featured (true/false)', 'text']
      ]
    },
    media_assets: {
      title: 'MEDIA LIBRARY',
      hint: 'Add photos, YouTube videos, highlights and memes using public URLs',
      pk: 'id',
      cols: ['id', 'file_name', 'file_type', 'category', 'file_url'],
      fields: [
        ['file_name', 'Title / file name', 'text'],
        ['file_url', 'Public file URL / YouTube URL', 'url'],
        ['file_type', 'File type (image / video)', 'text'],
        ['category', 'Category (photo / highlight / meme)', 'text'],
        ['alt_text', 'Description', 'text']
      ]
    },
    site_settings: {
      title: 'SITE SETTINGS',
      hint: 'Key/value website settings',
      pk: 'id',
      cols: ['id', 'setting_key', 'setting_value', 'updated_at'],
      fields: [
        ['setting_key', 'Setting key', 'text'],
        ['setting_value', 'Setting value (valid JSON or text)', 'textarea']
      ]
    }
  };

  let active = 'roster_players';
  let editing = null;

  const msg = (message) => {
    const node = $('dataMessage');
    if (node) node.textContent = message || '';
  };

  async function isAdmin(user) {
    const { data, error } = await db
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) console.error('Admin role check failed:', error);
    return !error && !!data;
  }

  async function showSession() {
    const { data, error } = await db.auth.getSession();
    if (error) {
      loginMessage.textContent = error.message;
      return;
    }

    const session = data.session;
    if (!session) {
      loginPanel.classList.remove('admin-hidden');
      dashboard.classList.add('admin-hidden');
      $('logoutBtn').classList.add('admin-hidden');
      return;
    }

    if (!(await isAdmin(session.user))) {
      await db.auth.signOut();
      loginPanel.classList.remove('admin-hidden');
      dashboard.classList.add('admin-hidden');
      $('logoutBtn').classList.add('admin-hidden');
      loginMessage.textContent = 'This account does not have administrator access.';
      return;
    }

    loginPanel.classList.add('admin-hidden');
    dashboard.classList.remove('admin-hidden');
    $('logoutBtn').classList.remove('admin-hidden');
    await loadTable();
  }

  $('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = 'Signing in…';

    const { error } = await db.auth.signInWithPassword({
      email: $('email').value.trim(),
      password: $('password').value
    });

    loginMessage.textContent = error ? error.message : '';
    if (!error) await showSession();
  });

  $('logoutBtn').addEventListener('click', async () => {
    await db.auth.signOut();
    await showSession();
  });

  $('adminNav').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-table]');
    if (!button) return;

    active = button.dataset.table;
    document.querySelectorAll('#adminNav button').forEach((item) => {
      item.classList.toggle('active', item === button);
    });

    $('editor').classList.add('admin-hidden');
    editing = null;
    loadTable();
  });

  async function loadTable() {
    if (active === 'tactical_maps') {
      $('tableTitle').textContent = 'TACTICAL MAPS';
      $('tableHint').textContent = 'Upload your pre-made strategy image for each map. Images are displayed fully inside compact square cards.';
      $('tableHead').innerHTML = '<tr><th>MAP</th><th>STRATEGY IMAGE URL</th><th>STATUS</th><th>ACTION</th></tr>';
      $('tableBody').innerHTML = '<tr><td colspan="4">Use “EDIT MAP IMAGES” to manage all six maps.</td></tr>';
      msg('Tactical images are saved in site_settings using the tactical_maps key.');
      $('addBtn').textContent = 'EDIT MAP IMAGES';
      $('editor').classList.add('admin-hidden');
      return;
    }
    $('addBtn').textContent = '+ ADD NEW';
    const schema = schemas[active];
    $('tableTitle').textContent = schema.title;
    $('tableHint').textContent = schema.hint;
    msg('Loading…');

    const { data, error } = await db
      .from(active)
      .select('*')
      .order(schema.pk, { ascending: true })
      .limit(100);

    if (error) {
      msg('Could not load data: ' + error.message);
      $('tableHead').innerHTML = '';
      $('tableBody').innerHTML = '';
      console.error(`Could not load ${active}:`, error);
      return;
    }

    msg((data || []).length + ' record(s) loaded.');
    $('tableHead').innerHTML =
      '<tr>' + schema.cols.map((column) => `<th>${escapeHtml(column)}</th>`).join('') +
      '<th>ACTIONS</th></tr>';

    $('tableBody').innerHTML = (data || []).map((row) =>
      '<tr>' +
      schema.cols.map((column) =>
        `<td>${escapeHtml(formatCell(row[column]))}</td>`
      ).join('') +
      `<td>
        <button class="admin-btn secondary" data-edit="${encodeURIComponent(JSON.stringify(row))}">EDIT</button>
        <button class="admin-btn admin-danger" data-delete="${escapeHtml(String(row[schema.pk]))}">DELETE</button>
      </td></tr>`
    ).join('');

    $('tableBody').querySelectorAll('[data-edit]').forEach((button) => {
      button.addEventListener('click', () => {
        openEditor(JSON.parse(decodeURIComponent(button.dataset.edit)));
      });
    });

    $('tableBody').querySelectorAll('[data-delete]').forEach((button) => {
      button.addEventListener('click', () => deleteRow(button.dataset.delete));
    });
  }

  function formatCell(value) {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  $('addBtn').addEventListener('click', async () => {
    if (active === 'tactical_maps') { await openTacticalEditor(); return; }
    openEditor(null);
  });

  const tacticalMapKeys = ['bermuda','purgatory','kalahari','nexterra','solara','alpine'];
  async function openTacticalEditor() {
    msg('Loading tactical images…');
    const { data, error } = await db.from('site_settings').select('*').eq('setting_key','tactical_maps').maybeSingle();
    if (error) { msg('Could not load tactical_maps setting: ' + error.message); return; }
    const current = data?.setting_value && typeof data.setting_value === 'object' ? data.setting_value : {};
    $('editorTitle').textContent = 'UPLOAD TEAM STRATEGY IMAGES';
    $('editorFields').innerHTML = tacticalMapKeys.map(key => {
      const entry = current[key]; const url = typeof entry === 'string' ? entry : (entry?.image_url || entry?.url || '');
      return `<div class="field full tactical-field"><label>${key.toUpperCase()} — IMAGE URL<input name="map_${key}_url" type="url" value="${escapeHtml(url)}" placeholder="Paste public image URL (optional)"></label><label>OR UPLOAD IMAGE<input name="map_${key}_file" type="file" accept="image/*"></label><small class="admin-muted">Square card · full image visible · no crop. Upload JPG, PNG or WEBP.</small></div>`;
    }).join('');
    $('editor').classList.remove('admin-hidden'); $('editor').scrollIntoView({behavior:'smooth',block:'start'});
    msg('Choose a file or paste a public URL for each map, then Save Tactical Maps.');
    const save=document.querySelector('#recordForm button[type="submit"]'); if(save) save.textContent='SAVE TACTICAL MAPS';
  }


  $('cancelEdit').addEventListener('click', () => {
    $('editor').classList.add('admin-hidden');
  });

  function openEditor(row) {
    editing = row;
    $('editorTitle').textContent = row ? 'Edit record' : 'Add record';
    const saveButton=document.querySelector('#recordForm button[type="submit"]'); if(saveButton) saveButton.textContent='SAVE RECORD';

    $('editorFields').innerHTML = schemas[active].fields.map(([name, label, type]) => {
      let value = row?.[name] ?? '';
      if (typeof value === 'object' && value !== null) value = JSON.stringify(value);
      if (type === 'datetime-local' && value) value = String(value).slice(0, 16);

      if (type === 'textarea') {
        return `<div class="field full"><label>${escapeHtml(label)}
          <textarea name="${name}" rows="3">${escapeHtml(value)}</textarea>
        </label></div>`;
      }

      const uploadable = ['image_url','poster_url','file_url'].includes(name);
      return `<div class="field ${uploadable?'full':''}"><label>${escapeHtml(label)}
        <input name="${name}" type="${type}" value="${escapeHtml(value)}">
      </label>${uploadable?`<label>OR UPLOAD IMAGE / VIDEO<input name="${name}_file" type="file" accept="${name==='file_url'?'image/*,video/*':'image/*'}"></label><small class="admin-muted">Uploads to ${name==='image_url' && active==='roster_players'?'roster-photos':'dna-media'} storage.</small>`:''}</div>`;
    }).join('');

    $('editor').classList.remove('admin-hidden');
    $('editor').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function uploadSelectedFile(file, bucket, folder) {
    const safeName = String(file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g,'_');
    const path = `${folder}/${Date.now()}_${safeName}`;
    const { error } = await db.storage.from(bucket).upload(path, file, { upsert: false, cacheControl: '3600' });
    if (error) throw error;
    const { data } = db.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  $('recordForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (active === 'tactical_maps') {
      msg('Uploading and saving map images…');
      const { data: existing, error: readError } = await db.from('site_settings').select('*').eq('setting_key','tactical_maps').maybeSingle();
      if (readError) { msg('Could not read tactical settings: ' + readError.message); return; }
      const maps = existing?.setting_value && typeof existing.setting_value === 'object' ? {...existing.setting_value} : {};
      try {
        for (const key of tacticalMapKeys) {
          const urlField = event.target.elements[`map_${key}_url`];
          const fileField = event.target.elements[`map_${key}_file`];
          let url = urlField ? urlField.value.trim() : (typeof maps[key] === 'string' ? maps[key] : (maps[key]?.image_url || maps[key]?.url || ''));
          const file = fileField?.files?.[0];
          if (file) url = await uploadSelectedFile(file, 'dna-media', `tactical-maps/${key}`);
          maps[key] = url ? { image_url: url } : null;
        }
      } catch (uploadError) { msg('Upload failed: ' + uploadError.message + '. Check dna-media bucket permissions.'); return; }
      const { error } = await db.from('site_settings').upsert({setting_key:'tactical_maps',setting_value:maps,updated_at:new Date().toISOString()},{onConflict:'setting_key'});
      if (error) { msg('Save failed: ' + error.message); return; }
      msg('All six tactical map settings saved. Refresh the preview website.'); $('editor').classList.add('admin-hidden'); await loadTable(); return;
    }

    const schema = schemas[active];
    const payload = {};

    for (const [name, , type] of schema.fields) {
      const element = event.target.elements[name];
      if (!element) continue;

      const fileInput = event.target.elements[`${name}_file`];
      if (fileInput?.files?.[0] && ['image_url','poster_url','file_url'].includes(name)) {
        try {
          const bucket = active === 'roster_players' && name === 'image_url' ? 'roster-photos' : 'dna-media';
          const folder = active === 'roster_players' ? 'roster' : active;
          const uploadedUrl = await uploadSelectedFile(fileInput.files[0], bucket, folder);
          element.value = uploadedUrl;
        } catch (uploadError) { msg('Upload failed: ' + uploadError.message + '. Check Storage bucket permissions.'); return; }
      }
      let value = element.value.trim();
      if (value === '') continue;

      if (type === 'number') value = Number(value);

      if (type === 'datetime-local') {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          msg('Invalid date.');
          return;
        }
        value = date.toISOString();
      }

      if (name === 'is_active' || name === 'is_featured') {
        value = value.toLowerCase() === 'true';
      }

      if (active === 'site_settings' && name === 'setting_value') {
        try {
          value = JSON.parse(value);
        } catch {
          // Store plain text as a JSON string.
          value = value;
        }
      }

      payload[name] = value;
    }

    msg('Saving…');

    const query = editing
      ? db.from(active).update(payload).eq(schema.pk, editing[schema.pk])
      : db.from(active).insert(payload);

    const { error } = await query;
    if (error) {
      msg('Save failed: ' + error.message);
      console.error(`Could not save ${active}:`, error);
      return;
    }

    msg('Saved successfully.');
    $('editor').classList.add('admin-hidden');
    editing = null;
    await loadTable();
  });

  async function deleteRow(id) {
    if (!confirm('Delete this record? This cannot be undone.')) return;

    const primaryKey = schemas[active].pk;
    const value = active === 'site_settings' || active === 'media_assets'
      ? Number(id)
      : (Number.isNaN(Number(id)) ? id : Number(id));

    const { error } = await db
      .from(active)
      .delete()
      .eq(primaryKey, value);

    if (error) {
      msg('Delete failed: ' + error.message);
      return;
    }

    msg('Record deleted.');
    await loadTable();
  }

  showSession();
})();
