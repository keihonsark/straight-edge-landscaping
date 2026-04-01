#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const jsonArg = process.argv[2]
if (!jsonArg || !jsonArg.endsWith('.json')) {
  console.error('Usage: node launch.cjs clients/client-name.json')
  process.exit(1)
}

// STEP 1 — Read and validate JSON
console.log('')
console.log('===========================================')
console.log('  SARK Agency — New Client Site Launcher')
console.log('===========================================')
console.log('')

const jsonPath = path.resolve(jsonArg)
if (!fs.existsSync(jsonPath)) {
  console.error(`Error: file not found: ${jsonPath}`)
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

const required = ['slug', 'name', 'phone', 'city', 'state']
for (const key of required) {
  if (!data[key]) {
    console.error(`Error: "${key}" is required in ${jsonArg}`)
    process.exit(1)
  }
}

const slug = data.slug
const businessName = data.name
const shortName = businessName.replace(/ LLC| Inc| Services| Co\b/gi, '').trim()
const tagline = data.tagline || `${data.city}'s trusted lawn care professionals. Weekly maintenance, landscaping, irrigation, and more.`
const phone = data.phone
const phoneTel = phone.replace(/\D/g, '')
const email = data.email || ''
const city = data.city
const state = data.state
const owner = data.owner || 'us'
const serviceAreas = (data.serviceAreas || city).split(',').map(s => s.trim()).filter(Boolean)
const rating = data.rating || '5.0'
const reviewCount = data.reviewCount || '0'
const mapsUrl = data.mapsUrl || ''
const tier = data.tier || 'starter'
const region = `Greater ${city}`

const sourceDir = 'C:\\Users\\SS\\Desktop\\lawncare-bros'
const clientsDir = 'C:\\Users\\SS\\Desktop\\clients'
const clientDir = path.join(clientsDir, slug)

console.log(`Client:    ${businessName}`)
console.log(`Slug:      ${slug}`)
console.log(`City:      ${city}, ${state}`)
console.log(`Tier:      ${tier}`)
console.log(`Target:    ${clientDir}`)
console.log('')

if (fs.existsSync(clientDir)) {
  console.error(`Error: ${clientDir} already exists. Delete it first or choose a different slug.`)
  process.exit(1)
}

if (!fs.existsSync(clientsDir)) {
  fs.mkdirSync(clientsDir, { recursive: true })
}

try {
  // STEP 2 — Copy with robocopy
  console.log('[1/7] Copying template with robocopy...')
  try {
    execSync(
      `robocopy "${sourceDir}" "${clientDir}" /E /XD node_modules .git dist clients .vercel /XF launch.cjs launch.js`,
      { stdio: 'inherit', windowsHide: false }
    )
  } catch (e) {
    if (e.status >= 8) {
      throw new Error(`robocopy failed with exit code ${e.status}`)
    }
  }
  console.log('  Copy complete.')
  console.log('')

  // STEP 3 — npm install
  console.log('[2/7] Installing dependencies...')
  execSync('npm install', { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  console.log('')

  // STEP 4 — Write complete config.js
  console.log('[3/7] Writing config.js...')
  const configContent = `const config = {
  business: {
    name: ${JSON.stringify(businessName)},
    shortName: ${JSON.stringify(shortName)},
    tagline: ${JSON.stringify(tagline)},
    phone: ${JSON.stringify(phone)},
    phoneTel: ${JSON.stringify(phoneTel)},
    email: ${JSON.stringify(email)},
    address: ${JSON.stringify(`${city}, ${state}`)},
    city: ${JSON.stringify(city)},
    state: ${JSON.stringify(state)},
    region: ${JSON.stringify(region)},
    serviceAreas: ${JSON.stringify([...serviceAreas, 'And More'])},
    hours: "Mon\\u2013Fri: 7:00 AM \\u2013 6:00 PM, Sat: 8:00 AM \\u2013 4:00 PM",
    hoursShort: "Mon\\u2013Fri: 7am\\u20136pm, Sat: 8am\\u20134pm",
    founded: "${new Date().getFullYear()}",
    ownerName: ${JSON.stringify(owner)},
    successMessage: ${JSON.stringify(`${owner === 'us' ? 'We' : owner} will call you within a few hours!`)},
    clientPortalUrl: "",
    adminUrl: "",
    formspreeId: "xpqodbdv",
    facebookHandle: "",
  },
  google: {
    placeId: "",
    mapsUrl: ${JSON.stringify(mapsUrl)},
    rating: ${rating},
    reviewCount: ${reviewCount},
    reviews: [
      { name: "Happy Customer", text: ${JSON.stringify(`Great service! Professional, on time, and my yard looks amazing. Highly recommend to anyone in ${city}.`)} },
      { name: "Satisfied Client", text: ${JSON.stringify(`Best lawn care service in ${city}. Fair prices and excellent work every single time.`)} },
      { name: "Local Homeowner", text: "Very professional crew. They show up on time, do quality work, and leave everything clean. Will use again!" },
    ],
  },
  content: {
    about: {
      badge: "Top-Rated on Google & Facebook",
      eyebrow: "About Us",
      headline: "Your Local Lawn Care Experts",
      headlineAccent: "Experts",
      body: ${JSON.stringify(`We are a locally owned and operated lawn care company built on hard work, loyalty, and pride in every yard we touch. As a licensed, insured, and bonded business, we bring professional-grade results to homeowners across ${city} and surrounding areas. From routine mowing to full landscape transformations \u2014 we treat every property like it\u2019s our own.`)},
      bullets: [
        "Licensed, Insured & Bonded",
        "Locally Owned & Operated",
        "Weekly & Bi-Weekly Plans",
        "Free On-Site Estimates",
        "Bilingual Service (English & Spanish)",
      ],
    },
    hero: {
      cyclingWords: ["Our Passion.", "Our Business.", "Our Craft.", "Perfected."],
    },
    cta: {
      headline: "Ready to Transform Your Yard?",
      subheadline: "Call or text us today for a free on-site estimate \\u2014 no pressure, no obligation.",
    },
    trustBar: [
      "Licensed, Insured & Bonded",
      "Locally Owned",
      "Free Estimates",
      "Same-Week Service",
      "Se Habla Espa\\u00f1ol",
    ],
    trustBadges: {
      google: { title: "5.0 \\u2605\\u2605\\u2605\\u2605\\u2605", sub: "" },
      facebook: { title: "Active on Facebook", sub: "" },
      licensed: { title: "Licensed \\u00b7 Insured \\u00b7 Bonded", sub: "Verified" },
      bilingual: { title: "Se Habla Espa\\u00f1ol", sub: "English & Spanish Service" },
    },
    services: {
      eyebrow: "What We Do",
      headline: "Our Services",
      subheadline: "Comprehensive lawn care and landscaping solutions for residential and commercial properties.",
    },
    footer: {
      tagline: ${JSON.stringify(`Professional lawn care, landscaping, and irrigation services trusted by ${city} homeowners.`)},
    },
    servicePages: {
      whyTitle: "Why Choose Us",
      ctaTitle: "Ready to Get Started?",
      ctaSub: "Call or text us today for a free on-site estimate.",
    },
    blogAuthor: "The Team",
  },
  seo: {
    title: ${JSON.stringify(`${businessName} | ${city} Lawn Care`)},
    description: ${JSON.stringify(`Professional lawn care services in ${city}, ${state}. Mowing, landscaping, irrigation and more. Licensed, insured & bonded. Free estimates.`)},
  },
}

export default config
`
  fs.writeFileSync(path.join(clientDir, 'src', 'config.js'), configContent, 'utf-8')
  console.log('  Config written.')
  console.log('')

  // STEP 5 — Build
  console.log('[4/7] Building project...')
  execSync('npm run build', { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  console.log('  Build successful.')
  console.log('')

  // STEP 6 — Git init
  console.log('[5/7] Initializing git repo...')
  execSync('git init', { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  execSync('git add .', { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  execSync(`git commit -m "Initial commit \\u2014 ${businessName}"`, { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  console.log('')

  // STEP 7a — GitHub repo
  console.log('[6/7] Creating GitHub repo...')
  try {
    execSync(`gh repo create keihonsark/${slug} --private --source=. --remote=origin --push`, { cwd: clientDir, stdio: 'inherit', windowsHide: false })
  } catch (e) {
    console.error('  Warning: GitHub repo creation failed. Run: gh auth login')
    console.log('  Continuing...')
  }
  console.log('')

  // STEP 7b — Vercel deploy
  console.log('[7/7] Deploying to Vercel...')
  let vercelUrl = '(check Vercel dashboard)'
  try {
    const output = execSync('npx vercel --prod --yes', { cwd: clientDir, encoding: 'utf-8', windowsHide: false })
    const match = output.match(/https:\/\/[^\s]+\.vercel\.app/)
    if (match) vercelUrl = match[0]
    console.log(output)
  } catch (e) {
    if (e.stdout) {
      const match = e.stdout.match(/https:\/\/[^\s]+\.vercel\.app/)
      if (match) vercelUrl = match[0]
      console.log(e.stdout)
    } else {
      console.error('  Warning: Vercel deploy failed.')
    }
  }
  console.log('')

  // Summary
  console.log('===========================================')
  console.log('  LAUNCH COMPLETE')
  console.log('===========================================')
  console.log('')
  console.log(`  Client:      ${businessName}`)
  console.log(`  Tier:        ${tier}`)
  console.log(`  Slug:        ${slug}`)
  console.log(`  Directory:   ${clientDir}`)
  console.log(`  GitHub:      https://github.com/keihonsark/${slug}`)
  console.log(`  Vercel:      ${vercelUrl}`)
  console.log(`  Config:      ${path.join(clientDir, 'src', 'config.js')}`)
  console.log('')
  console.log('  Next steps:')
  console.log('  1. Replace logo and hero image in public/')
  console.log('  2. Update reviews in src/config.js with real ones')
  console.log('  3. Update ChatWidget responses for this client')
  console.log('  4. See launch-checklist.md for full checklist')
  console.log('')

} catch (err) {
  console.error('')
  console.error('Launch failed:')
  console.error(err.message)
  process.exit(1)
}
