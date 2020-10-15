const replaceTOC = (articles) => {
    // Generate HTML
    let toclist = '';
    toclist += '<div>';
    toclist += "<hr id='toc' />";
    toclist += '<h3>Table of Contents</h3>';
    toclist += "<ol class='tableofcontents'>";
    articles.forEach(({ slug, title, primary_author }) => {
        toclist += '<li><span>';
        toclist += "<a class='title' href='/" + slug + "/'>";
        toclist += title;
        toclist += '</a>';
        toclist += '<br/> by ';
        toclist += "<a class='author' href='/author/" + primary_author.slug + "/'>";
        toclist += primary_author.name;
        toclist += '</a>';
        toclist += '</span></li>';
    });
    toclist += '</ol>';
    toclist += '</div>';

    return toclist;
};

const tableOfContentsExt = (articles) => {
    return {
        type: 'lang',
        regex: /\[TableOfContents\]/g,
        replace: articles ? replaceTOC(articles) : ''
    };
};

export default tableOfContentsExt;
