export const config = { runtime: 'edge' };

export default async function handler(req) {
  const FFG_URL = 'https://ffg.jeudego.org/php/affichePersonne.php?id=12274';

  try {
    const res = await fetch(FFG_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Referer': 'https://ffg.jeudego.org/',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      },
    });

    if (!res.ok) {
      return new Response(`Erreur FFG: HTTP ${res.status}`, {
        status: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const html = await res.text();

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (e) {
    return new Response('Erreur: ' + e.message, {
      status: 503,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
