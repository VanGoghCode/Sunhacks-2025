## Why we built this
Every year millions of perfectly good laptops leave corporate offices for the shredder.  
At the same time, schools and NGOs scramble to find devices for kids who have none.  
We close that gap securely, transparently, and at scale.

## What Loop It is
A single web platform with three doors:

1. **Donor door** – for companies that want to give laptops away.  
2. **Marketplace door** – for schools and charities that need them.  
3. **Admin door** – for our own operations team.

We handle the scary part in the middle: certified data destruction, logistics, and proof that every machine actually reaches a student.

## How it works (the 30-second version)
1. A company logs in, tells us how many laptops they have, and downloads a tiny wipe script built for their exact OS and drive type.  
2. They run the script (takes about an hour). A green check-mark appears on their dashboard when the wipe is verified.  
3. They pick a pick-up date. Our van collects the batch.  
4. We refurbish, run a second wipe for good measure, and list the machines on an internal marketplace.  
5. Verified schools and NGOs browse, add items to a cart, and check out for zero dollars.  
6. Everyone gets a PDF certificate: donors for ESG reporting, schools for their records, and us for auditors.

## What you can explore in this repo
- `/` – the public landing page that explains the story and shows live impact numbers.  
- `/amazon/dashboard` – example donor portal (we used Amazon as a placeholder).  
- `/marketplace` – the catalog schools see when they log in.  
- `/impact` – open page that visualises CO₂ saved, devices diverted, schools served.  
- `/loopit/dashboard` – the control room our team uses to track inventory, approve recipients, and schedule drivers.

## Tech notes (only what you need to run it)
Built with Next.js 15, TypeScript, and Tailwind CSS.  
Charts come from Chart.js and Recharts; icons from Lucide React.  
No database is shipped in this hackathon version—everything is mocked in JSON so you can spin it up without env files.

```bash
git clone https://github.com/VanGoghCode/Sunhacks-2025.git  
cd Sunhacks-2025  
npm install  
npm run dev  
```
Visit localhost:3000 and click around.

## Security & compliance we had in mind
- Multi-pass data-erasure that follows NIST 800-88 and DoD 5220.22-M.  
- SHA-256 hash of every wipe log stored for audit.  
- GDPR “right to be forgotten” baked into the wipe script generator.  
- Blockchain-style tamper proof on certificates (simple Merkle-tree hash, no gas fees).

## Impact math we use
Manufacturing a new laptop emits roughly 300 kg of CO₂.  
Extending the life of an existing one by three years avoids about 250 kg.  
We display the running total on every dashboard.

## Business model (real world, not in code)
Companies pay us a small per-device fee that covers secure transport, refurbishment, and certification.  
Schools and NGOs pay nothing.  
We also sell white-label API access to large enterprises that want to plug the workflow straight into their IT asset-management system.

## Roadmap if we keep going
Phase 1 (now) – hackathon MVP, static data, happy-path flows.  
Phase 2 – plug in real inventory DB, driver app, barcode scanner.  
Phase 3 – multi-country, multi-language, multi-currency, plus an open API for any refurbisher to join the network.

## Team
Four friends who met at SunHacks 2025.  
Design, front-end, security research, and a lot of coffee.

## Questions?
Open an issue or reach out on the email in our GitHub profile.  
Thanks for reading—let’s keep laptops alive and kids learning.