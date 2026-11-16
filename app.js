(function () {
  const SUPABASE_URL = 'https://bygqbaixtcqhplllxyed.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_REs6u7WBfKjoJ0l3aFBkmQ_jXx__ZXu';
  const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

  const bg = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="cracks">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="10" result="noise"/>
    <feColorMatrix type="luminanceToAlpha" in="noise" result="alphaNoise"/>
    <feComponentTransfer in="alphaNoise" result="plates"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
    <feConvolveMatrix order="3 3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" in="plates" result="edges"/>
    <feComponentTransfer in="edges" result="invertedEdges"><feFuncR type="table" tableValues="1 0"/><feFuncG type="table" tableValues="1 0"/><feFuncB type="table" tableValues="1 0"/></feComponentTransfer>
    <feFlood flood-color="#ffffff" result="bgColor"/><feComposite operator="in" in="bgColor" in2="invertedEdges"/>
  </filter></svg>
  <div class="cracked-earth" aria-hidden="true"></div>`;

  const header = `
  <header>
    <div class="brand-logo">Addis Social Media Management</div>
    <div class="heart-interaction">
      <span class="like-count" id="like-count" aria-live="polite" title="Total likes">&ndash;</span>
      <label class="heart-container" for="site-like">
        <input type="checkbox" class="checkbox" id="site-like">
        <span class="svg-container" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="svg-outline"><path d="M12 20.5C5.5 15 3 12 3 8.7 3 6.1 5 4 7.5 4c1.8 0 3.5 1 4.5 2.6C13 5 14.7 4 16.5 4 19 4 21 6.1 21 8.7c0 3.3-2.5 6.3-9 11.8z"/></svg>
          <svg viewBox="0 0 24 24" class="svg-filled"><path d="M12 20.5C5.5 15 3 12 3 8.7 3 6.1 5 4 7.5 4c1.8 0 3.5 1 4.5 2.6C13 5 14.7 4 16.5 4 19 4 21 6.1 21 8.7c0 3.3-2.5 6.3-9 11.8z"/></svg>
          <svg class="svg-celebrate" width="40" height="40"><polygon points="10,10 20,20"/><polygon points="10,30 20,30"/><polygon points="30,10 20,20"/><polygon points="30,30 20,30"/></svg>
        </span>
        <span class="sr-only">Like this site</span>
      </label>
    </div>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col footer-about">
        <div class="footer-brand">Addis Social Media Management</div>
        <p class="footer-tagline">Addis Social Media Management & Creator Studio. Elevating your digital presence across platforms.</p>
      </div>

      <div class="footer-col footer-contacts">
        <u><h4>Contact us</h4></u>
        <span><a href="tel:+251929364848">+251 929 364 848</a></span>
        <span><a href="tel:+251972246842">+251 972 246 842</a></span>
      </div>

      <div class="footer-col footer-socials-col">
        <h4>For more information</h4>
        <div class="social-links">
          <a href="https://www.instagram.com/asmm0949/" target="_blank" rel="noopener" class="btn-brutal">Instagram</a>
          <a href="https://www.tiktok.com/@asmm_09" target="_blank" rel="noopener" class="btn-brutal">TikTok</a>
          <a href="https://t.me/RBLBL_HM" target="_blank" rel="noopener" class="btn-brutal btn-dark">Telegram</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 ASSM . All rights reserved.</p>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', bg);
  const main = document.querySelector('main');
  if (main) main.insertAdjacentHTML('beforebegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  const LIKE_KEY = 'si_liked';
  const likeBox = document.getElementById('site-like');
  const likeCount = document.getElementById('like-count');
  let likeTotal = null;

  function showLikes() {
    likeCount.textContent = likeTotal === null ? '\u2013' : Number(likeTotal).toLocaleString();
  }

  try {
    if (localStorage.getItem(LIKE_KEY) === '1') { likeBox.checked = true; likeBox.disabled = true; }
  } catch (e) { }

  async function loadLikes() {
    if (!supabase) return;
    const { data, error } = await supabase.rpc('get_likes');
    if (!error && data !== null) { likeTotal = Number(data); showLikes(); }
  }

  likeBox.addEventListener('change', async () => {
    if (!likeBox.checked) return;
    likeBox.disabled = true;
    try { localStorage.setItem(LIKE_KEY, '1'); } catch (e) {}
    if (likeTotal !== null) { likeTotal += 1; showLikes(); }
    if (!supabase) return;
    const { data, error } = await supabase.rpc('add_like');
    if (error) {
      console.error('Like failed:', error.message);
      likeBox.checked = false;
      likeBox.disabled = false;
      try { localStorage.removeItem(LIKE_KEY); } catch (e) {}
      loadLikes();
      return;
    }
    likeTotal = Number(data);
    showLikes();
  });

  loadLikes();
})();
