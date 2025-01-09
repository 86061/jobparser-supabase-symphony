export const cleanField = (field: string) => {
  if (!field) return '';
  return field
    .replace(/Identified by Google from the original job post/g, '')
    .replace(/Job highlightsIdentified Google from original job post/g, '')
    .replace(/<\/li><li class="LevrW">/g, '<BR>- ')
    .replace(/<\/li><li jsname="wsRnQ" style="" class="LevrW">/g, '<BR>- ')
    .replace(/([.!?])([A-Z])/g, '$1 $2')
    .trim();
};

export const cleanJsonLdField = (field: string) => {
  if (!field) return '';
  return field
    .replace(/Identified by Google from the original job post/g, '')
    .replace(/Job highlightsIdentified Google from original job post/g, '')
    .replace(/<\/li><li class="LevrW">/g, '\n- ')
    .replace(/<\/li><li jsname="wsRnQ" style="" class="LevrW">/g, '\n- ')
    .replace(/<BR>- /g, '\n- ')
    .trim();
};

export const cleanMetaField = (field: string) => {
  if (!field) return '';
  return field
    .replace(/Identified by Google from the original job post/g, '')
    .replace(/Job highlightsIdentified Google from original job post/g, '')
    .replace(/<\/li><li class="LevrW">/g, ' - ')
    .replace(/<\/li><li jsname="wsRnQ" style="" class="LevrW">/g, ' - ')
    .trim();
};

export const generateHashtags = (title: string, maxTags = 7) => {
  const hashtags = title
    .toLowerCase()
    // Ganti semua karakter khusus kecuali - dengan spasi
    .replace(/[^a-z0-9\-\s]/g, ' ')
    // Pisahkan berdasarkan spasi atau -
    .split(/[\s-]+/)
    // Filter kata yang terlalu pendek dan hapus whitespace
    .filter(word => word.length > 2 && word.trim())
    .map(word => word.trim())
    .filter(Boolean)
    .slice(0, maxTags);

  return {
    commaList: hashtags.join(', '),
    hashList: hashtags.map(tag => `#${tag}`).join(', '),
    plainList: hashtags.join(', '),
    spaceHashList: hashtags.map(tag => `# ${tag}`).join(', '),
  };
};

export const generateHtmlTemplate = (job: any, date: string, hashtags: any) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${job.metaDescription}">
    <meta property="og:title" content="${job.pageTitle}">
    <meta property="og:description" content="${job.metaDescription}">
    ${job.imageUrl ? `<meta property="og:image" content="${job.imageUrl}">` : ''}
    <title>${job.pageTitle}</title>
    <link rel="stylesheet" href="/post.css">
</head>
<body>
    <header>
      <nav class="menu">
        <a href="/">Home</a> | 
        <a href="https://job.web.id/">Jobs</a>
      </nav>
      ${job.imageUrl ? `<img src="${job.imageUrl}" alt="${job.jobTitle}" class="featured-image">` : ''}
      <h1>${job.pageTitle}</h1>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Job Type:</strong> ${job.jobType}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
    </header>
    <main>
        ${job.description ? `
        <section>
            <h2>Job Description</h2>
            <p>${job.description}</p>
        </section>` : ''}
        
        ${job.qualifications?.length ? `
        <section>
            <h2>Qualifications</h2>
            <ul>
                ${job.qualifications?.map(qual => `<li>- ${qual}</li>`).join('\n                ') || ''}
            </ul>
        </section>` : ''}
        
        ${job.benefits?.length ? `
        <section>
            <h2>Benefits</h2>
            <ul>
                ${job.benefits?.map(benefit => `<li>- ${benefit}</li>`).join('\n                ') || ''}
            </ul>
        </section>` : ''}
        
        ${job.responsibilities?.length ? `
        <section>
            <h2>Responsibilities</h2>
            <ul>
                ${job.responsibilities?.map(resp => `<li>- ${resp}</li>`).join('\n                ') || ''}
            </ul>
        </section>` : ''}
        
        <section>
            <h2>How to Apply</h2>
            <a href="${job.applyLink}" rel="nofollow">Apply Here</a>
        </section>
        <section>
            <h2>Location Map</h2>
            <p><strong>Location Map:</strong> <div class="mapouter"><div class="gmap_canvas"><iframe loading="lazy" id="gmap_canvas" title="${job.jobTitle}" src="https://maps.google.com/maps?q=${encodeURIComponent(job.location)}&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed" width="100%" height="240px" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="width: 100%;"></iframe></div></div></p>
        </section>
        <section>
            <h2>Hashtags</h2>
            ${hashtags.hashList}<br>
            ${hashtags.plainList}<br>
            ${hashtags.spaceHashList}<br>
        </section>

        <section>
            <h2>Snippet</h2>
            <blockquote>
                ${job.metaDescription} ${hashtags.hashList.replace(/,/g, '')}
            </blockquote>
                <div class="social-share">
                    <script>
                        // Get the current domain, defaulting to uk.job.web.id if not set
                        const domain = document.querySelector('meta[name="job-domain"]')?.getAttribute('content') || 'uk.job.web.id';
                        const postUrl = \`https://\${domain}/${job.slug}.html\`;
                        
                        document.write(\`
                            <a href="https://twitter.com/intent/tweet?text=\${encodeURIComponent(\`${job.metaDescription} ${hashtags.hashList.replace(/,/g, '')}\`)}%20via%20@jobwebid&url=\${encodeURIComponent(postUrl)}" 
                               target="_blank" rel="noopener noreferrer">Share on X (Twitter)</a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(postUrl)}&quote=\${encodeURIComponent(\`${job.metaDescription} ${hashtags.hashList.replace(/,/g, '')}\`)}" 
                               target="_blank" rel="noopener noreferrer">Share on Facebook</a>
                            <a href="https://api.whatsapp.com/send?text=\${encodeURIComponent(\`${job.metaDescription} ${hashtags.hashList.replace(/,/g, '')}\`)}%20\${encodeURIComponent(postUrl)}" 
                               target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
                            <a href="https://www.linkedin.com/shareArticle?mini=true&url=\${encodeURIComponent(postUrl)}&title=\${encodeURIComponent(job.pageTitle)}&summary=\${encodeURIComponent(\`${job.metaDescription} ${hashtags.hashList.replace(/,/g, '')}\`)}%20via%20jobwebid" 
                               target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
                        \`);
                    </script>
                </div>
                <style>
                    .social-share {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1rem;
                    }
                    .social-share a {
                        display: inline-block;
                        padding: 0.5rem 1rem;
                        background: #f3f4f6;
                        border-radius: 0.375rem;
                        text-decoration: none;
                        color: #374151;
                        font-size: 0.875rem;
                        transition: background-color 0.2s;
                    }
                    .social-share a:hover {
                        background: #e5e7eb;
                    }
                </style>
        </section>

        <section>
            <h2>Slug</h2>
            <textarea style="width: 100%; box-sizing: border-box;">${job.slug.trim()}</textarea>
        </section>
    </main>
    <footer>
        <p>Published on ${date}</p>
        <p>Created by <a href="https://job.web.id">Andreas Wikan</a></p>
        <p>&copy; ${new Date().getFullYear()} All rights reserved.</p>
    </footer>
    <script type="application/ld+json">${JSON.stringify({
      ...job.jsonLd,
      title: job.pageTitle,
      image: job.imageUrl || undefined
    }, null, 2)}</script>
</body>
</html>`;
