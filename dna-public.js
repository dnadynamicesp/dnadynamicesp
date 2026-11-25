(() => {
  const db = window.dnaSupabase;
  if (!db) {
    console.error('DNA Dynamic: Supabase client is not available.');
    return;
  }

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  const profileFiles = {
    'DNA-JIAD': 'jiad.html',
    'DNA-FLEX': 'flex.html',
    'DNA-NINJA': 'ninja.html',
    'DNA-SAMBA': 'samba.html'
  };

  const safeDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  async function getPlayers() {
    const { data, error } = await db
      .from('roster_players')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  function updateRoster(players) {
    const container = document.querySelector('.players');
    if (!container || !players.length) return;

    container.innerHTML = players.map((player, index) => {
      const tag = String(player.gamer_tag || '').toUpperCase();
      const href = profileFiles[tag] || '#';
      const image = player.image_url || `images/${tag.toLowerCase().replace('dna-', '')}.png`;
      return `<a href="${escapeHtml(href)}" class="player-card">
        <div class="player-image-wrap">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(tag)}" class="player-image" loading="lazy">
          <span class="player-overlay">VIEW PROFILE ↗</span>
          <span class="player-number">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <div class="player-info"><div><h3>${escapeHtml(tag)}</h3><p>${escapeHtml(player.role || '')}</p></div><span class="card-arrow">↗</span></div>
      </a>`;
    }).join('');

    const count = String(players.length).padStart(2, '0');
    const countNode = document.querySelector('.roster-count b');
    if (countNode) countNode.textContent = count;
    const statsCount = document.querySelector('[data-count]');
    if (statsCount) statsCount.textContent = count;
    const rosterCount = document.querySelector('.roster-count');
    if (rosterCount) rosterCount.innerHTML = `ROSTER <b>${count}</b> / ${count}`;
  }

  function updateProfile(player) {
    const tag = String(player.gamer_tag || '').toUpperCase();
    const h1 = document.querySelector('.profile-hero-copy h1');
    const h2 = document.querySelector('.profile-hero-copy h2');
    const role = document.querySelector('.role-badge');
    const portraitLabel = document.querySelector('.portrait-label strong');
    const portrait = document.querySelector('.profile-image');
    const stats = document.querySelectorAll('.profile-stats .profile-stat');

    if (h1) h1.textContent = tag;
    if (h2) h2.textContent = player.real_name || '';
    if (role) role.innerHTML = `<span class="role-indicator"></span>${escapeHtml(player.role || '')}`;
    if (portraitLabel) portraitLabel.textContent = tag;
    if (portrait && player.image_url) {
      portrait.src = player.image_url;
      portrait.alt = `${tag} — ${player.real_name || ''}`;
    }

    if (stats[0]) stats[0].querySelector('strong').textContent = player.age ?? '—';
    if (stats[1]) stats[1].querySelector('strong').textContent = player.experience || '—';
    if (stats[2]) stats[2].querySelector('strong').textContent = player.game_uid || '—';
    if (stats[3]) stats[3].querySelector('strong').textContent = player.role || '—';

    const links = document.querySelectorAll('.profile-social-links .profile-social-link');
    const values = [
      player.phone ? `tel:${String(player.phone).replace(/[^0-9+]/g, '')}` : '',
      player.instagram_url || '',
      player.facebook_url || ''
    ];
    links.forEach((link, index) => {
      if (values[index]) {
        link.href = values[index];
        if (index > 0) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      }
    });

    if (player.achievements) {
      const record = document.querySelector('.empty-achievement p');
      if (record) record.textContent = player.achievements;
    }
  }

  function updateMatches(matches) {
    const grid = document.querySelector('#matches .feature-grid');
    if (!grid || !matches.length) return;

    grid.innerHTML = matches.slice(0, 2).map((match, index) => {
      const title = match.match_title || match.tournament_name || 'DNA MATCH UPDATE';
      const tournament = match.tournament_name || 'TOURNAMENT';
      const status = String(match.status || 'upcoming').toUpperCase();
      const opponent = match.opponent || 'TBD';
      const date = safeDate(match.match_date);
      const score = (match.our_score || match.opponent_score)
        ? `${escapeHtml(match.our_score ?? 'DNA')} <i>VS</i> ${escapeHtml(match.opponent_score ?? opponent)}`
        : `DNA <i>VS</i> ${escapeHtml(opponent)}`;
      const poster = match.poster_url
        ? `<img src="${escapeHtml(match.poster_url)}" alt="${escapeHtml(title)} poster" style="width:100%;height:100%;object-fit:cover">`
        : `<span class="art-cross">✳</span><span class="art-word">${index === 0 ? 'COMPETE' : 'DNA'}</span><span class="art-sub">DNA / MATCHDAY</span>`;
      return `<article class="feature-card ${index === 0 ? 'feature-card-large' : ''}">
        <div class="feature-art ${index === 0 ? 'art-arena' : 'art-score'}">${poster}</div>
        <div class="feature-card-body">
          <div class="card-meta"><span>${escapeHtml(tournament)}</span><span class="demo-pill">${escapeHtml(status)}</span></div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(match.description || `${opponent}${date ? ` · ${date}` : ''}${match.result ? ` · ${match.result}` : ''}`)}</p>
          ${match.our_score || match.opponent_score ? `<p><strong>${escapeHtml(score)}</strong></p>` : ''}
        </div>
      </article>`;
    }).join('');
    const badge = document.querySelector('#matches .section-heading-row .demo-pill');
    if (badge) badge.textContent = 'LIVE UPDATES';
    const description = document.querySelector('#matches .section-description');
    if (description) description.textContent = 'Latest tournament and match updates from DNA Dynamic.';
  }

  function updateAnnouncements(posts) {
    const signing = posts.find((post) => ['signing', 'new_signing', 'new-signing'].includes(String(post.category || '').toLowerCase()));
    const farewell = posts.find((post) => ['farewell', 'departure'].includes(String(post.category || '').toLowerCase()));

    if (signing) {
      const card = document.querySelector('.signing-feature');
      if (card) {
        const image = signing.image_url
          ? `<img src="${escapeHtml(signing.image_url)}" alt="${escapeHtml(signing.title)}" loading="lazy" style="width:min(78%,340px);height:300px;object-fit:contain;position:relative;z-index:1">`
          : `<img src="images/dna-logo.png" alt="DNA Dynamic emblem" loading="lazy">`;
        card.innerHTML = `<div class="signing-visual">${image}<span class="signing-stamp">OFFICIAL ANNOUNCEMENT</span></div>
          <div class="signing-copy"><p class="section-label">OFFICIAL ROSTER ANNOUNCEMENT</p>
          <h3>${escapeHtml(signing.title)}</h3>
          <p>${escapeHtml(signing.description || '')}</p>
          <div class="signing-details"><span>CATEGORY <b>NEW SIGNING</b></span><span>DATE <b>${escapeHtml(safeDate(signing.event_date) || 'ANNOUNCED')}</b></span></div>
          <span class="status-tag"><i></i> OFFICIAL DNA UPDATE</span></div>`;
      }
      const badge = document.querySelector('#signings .section-heading-row .demo-pill');
      if (badge) badge.textContent = 'PUBLISHED';
    }

    if (farewell) {
      const card = document.querySelector('.farewell-placeholder');
      if (card) {
        card.classList.remove('farewell-placeholder');
        card.classList.add('farewell-placeholder', 'farewell-published');
        card.innerHTML = `${farewell.image_url ? `<img src="${escapeHtml(farewell.image_url)}" alt="${escapeHtml(farewell.title)}" style="width:100px;height:100px;object-fit:cover">` : '<span class="farewell-mark">DNA</span>'}
          <div><span class="demo-pill">OFFICIAL FAREWELL</span><h4>${escapeHtml(farewell.title)}</h4>
          <p>${escapeHtml(farewell.description || '')}</p></div>`;
      }
    }
  }

  function youtubeEmbed(url) {
    try {
      const parsed = new URL(url);
      let id = '';
      if (parsed.hostname.includes('youtu.be')) id = parsed.pathname.slice(1);
      else if (parsed.hostname.includes('youtube.com')) {
        id = parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
      }
      if (!id || !/^[\w-]{6,}$/.test(id)) return '';
      return `https://www.youtube-nocookie.com/embed/${id}`;
    } catch {
      return '';
    }
  }

  function updateMedia(assets, highlightPosts) {
    const grid = document.querySelector('.media-grid');
    if (!grid) return;

    grid.querySelectorAll('.dna-dynamic-media').forEach((node) => node.remove());

    const combined = [
      ...assets.map((asset) => ({
        url: asset.file_url,
        title: asset.file_name,
        description: asset.alt_text,
        type: asset.file_type,
        category: asset.category
      })),
      ...highlightPosts.map((post) => ({
        url: post.image_url,
        title: post.title,
        description: post.description,
        type: 'video',
        category: 'highlight'
      }))
    ];

    const hasPhoto = combined.some((asset) => {
      const url = String(asset.url || '');
      const category = String(asset.category || '').toLowerCase();
      const type = String(asset.type || '').toLowerCase();
      return !!url && !category.includes('meme') && !category.includes('highlight') &&
        category !== 'video' && !type.includes('video') && !youtubeEmbed(url);
    });
    const hasVideo = combined.some((asset) => {
      const url = String(asset.url || '');
      const category = String(asset.category || '').toLowerCase();
      const type = String(asset.type || '').toLowerCase();
      return !!url && (category.includes('highlight') || category === 'video' ||
        type.includes('video') || !!youtubeEmbed(url));
    });

    if (hasPhoto) {
      grid.querySelectorAll('.media-card[data-category="photo"]:not(.dna-dynamic-media)').forEach((node) => node.remove());
    }
    if (hasVideo) {
      grid.querySelectorAll('.media-card[data-category="video"]:not(.dna-dynamic-media)').forEach((node) => node.remove());
    }

    combined.forEach((asset) => {
      const url = String(asset.url || '');
      if (!url) return;

      const type = String(asset.type || '').toLowerCase();
      const category = String(asset.category || '').toLowerCase();
      const isVideo = type.includes('video') || category.includes('highlight') || category === 'video' || !!youtubeEmbed(url);
      const isMeme = category.includes('meme');
      const filter = isMeme ? 'meme' : (isVideo ? 'video' : 'photo');
      const title = asset.title || asset.description || (isVideo ? 'DNA HIGHLIGHT' : 'DNA PHOTO');
      const description = asset.description || (isVideo ? 'DNA Dynamic gameplay highlight.' : 'DNA Dynamic media update.');
      const embed = isVideo ? youtubeEmbed(url) : '';

      let visual;
      if (embed) {
        visual = `<iframe src="${embed}" title="${escapeHtml(title)}" loading="lazy" style="width:100%;height:220px;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      } else if (isVideo && /\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
        visual = `<video controls preload="metadata" style="width:100%;height:220px;object-fit:cover"><source src="${escapeHtml(url)}"></video>`;
      } else {
        visual = `<img src="${escapeHtml(url)}" alt="${escapeHtml(title)}" loading="lazy">`;
      }

      const card = document.createElement('article');
      card.className = 'media-card dna-dynamic-media';
      card.dataset.category = filter;
      card.innerHTML = `<div class="${isVideo ? 'video-placeholder' : 'media-thumb'}">${visual}<span class="media-type">${isVideo ? 'HIGHLIGHT' : (isMeme ? 'MEME' : 'PHOTO')}</span></div>
        <div class="media-caption"><span>${escapeHtml(category.toUpperCase() || 'DNA MEDIA')}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`;
      grid.appendChild(card);
    });

    // Apply whichever media tab is currently selected to newly added cards.
    const selected = document.querySelector('.media-tab.active')?.dataset.filter || 'all';
    grid.querySelectorAll('.media-card').forEach((card) => {
      card.hidden = !(selected === 'all' || card.dataset.category === selected);
    });
  }

  async function loadPublicSections() {
    const tasks = [
      db.from('matches').select('*').order('match_date', { ascending: false }).limit(10),
      db.from('content_posts').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(30),
      db.from('media_assets').select('*').order('created_at', { ascending: false }).limit(50)
    ];

    const [matchesResult, postsResult, mediaResult] = await Promise.all(tasks);

    if (matchesResult.error) console.error('DNA Dynamic matches could not load:', matchesResult.error);
    else updateMatches(matchesResult.data || []);

    const posts = postsResult.error ? [] : (postsResult.data || []);
    if (postsResult.error) console.error('DNA Dynamic announcements could not load:', postsResult.error);
    else updateAnnouncements(posts);

    if (mediaResult.error) console.error('DNA Dynamic media could not load:', mediaResult.error);
    updateMedia(
      mediaResult.error ? [] : (mediaResult.data || []),
      posts.filter((post) => ['highlight', 'highlights', 'gameplay_highlight'].includes(String(post.category || '').toLowerCase()))
    );
  }

  async function init() {
    try {
      const players = await getPlayers();
      if (document.querySelector('.players')) {
        updateRoster(players);
      } else {
        const file = location.pathname.split('/').pop().toLowerCase();
        const tagByFile = {
          'jiad.html': 'DNA-JIAD',
          'flex.html': 'DNA-FLEX',
          'ninja.html': 'DNA-NINJA',
          'samba.html': 'DNA-SAMBA'
        };
        const tag = tagByFile[file];
        const player = players.find((item) => String(item.gamer_tag || '').toUpperCase() === tag);
        if (player) updateProfile(player);
      }
    } catch (error) {
      console.error('DNA Dynamic roster could not load from Supabase:', error);
    }

    if (document.querySelector('#matches') || document.querySelector('.media-grid')) {
      try {
        await loadPublicSections();
      } catch (error) {
        console.error('DNA Dynamic public sections could not load:', error);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
