export async function onRequestPost({ request, env }) {
  const contentType = request.headers.get("content-type") || "";
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  // Parse body (supports HTML form posts and JSON)
  let data;
  if (contentType.includes("application/json")) {
    data = await request.json();
  } else {
    const fd = await request.formData();
    data = Object.fromEntries(fd);
  }

  const name = (data.name || "").toString().trim().slice(0, 200);
  const email = (data.email || "").toString().trim().slice(0, 200);
  const message = (data.message || "").toString().trim().slice(0, 5000);
  const turnstileToken = data["cf-turnstile-response"] || "";

  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "Invalid input." }, 400);
  }

  // Verify Turnstile
  const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: turnstileToken,
      remoteip: ip
    })
  }).then(r => r.json());

  if (!tsRes.success) {
    return json({ ok: false, error: "CAPTCHA failed." }, 400);
  }

    // Send via Resend
  const emailResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [env.TO_EMAIL],
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`
    })
  });

  if (!emailResp.ok) {
    const err = await emailResp.text();
    return json({ ok: false, error: "Email send failed", details: err }, 500);
  }