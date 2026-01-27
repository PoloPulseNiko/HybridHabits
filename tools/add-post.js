#!/usr/bin/env node
// Simple helper to append a blog post to blogentries/entries.json.
// Usage example:
// node tools/add-post.js --slug 020226 --title "My New Post" --date 2026-02-02 --excerpt "Short teaser" --p "Paragraph one." --p "Paragraph two."

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const options = { paragraphs: [] };
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
        const key = arg.replace(/^--/, '');
        if (key === 'p' || key === 'paragraph') {
            const val = args[i + 1];
            if (val && !val.startsWith('--')) {
                options.paragraphs.push(val);
                i++;
            }
            continue;
        }
        const val = args[i + 1];
        if (val && !val.startsWith('--')) {
            options[key] = val;
            i++;
        } else {
            options[key] = true;
        }
    }
}

const required = ['slug', 'title', 'date', 'excerpt'];
const missing = required.filter(key => !options[key]);
if (missing.length) {
    console.error(`Missing required options: ${missing.join(', ')}`);
    process.exit(1);
}

if (!options.paragraphs.length) {
    console.error('Add at least one paragraph with --p "text".');
    process.exit(1);
}

const entriesPath = path.join(__dirname, '..', 'blogentries', 'entries.json');
const content = fs.readFileSync(entriesPath, 'utf8');
const data = JSON.parse(content);
if (!Array.isArray(data.posts)) {
    data.posts = [];
}

if (data.posts.some(p => p.slug === options.slug)) {
    console.error(`Slug already exists: ${options.slug}`);
    process.exit(1);
}

const toTitleCase = str => str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

const formatDisplayDate = iso => {
    const dateObj = new Date(iso);
    if (Number.isNaN(dateObj.getTime())) return iso;
    return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const entry = {
    slug: options.slug,
    title: options.title || toTitleCase(options.slug),
    displayDate: options.display || formatDisplayDate(options.date),
    sortDate: options.date,
    excerpt: options.excerpt,
    paragraphs: options.paragraphs
};

data.posts.push(entry);
data.posts.sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));

fs.writeFileSync(entriesPath, JSON.stringify(data, null, 2));
console.log(`Added post ${entry.slug} -> ${entriesPath}`);
