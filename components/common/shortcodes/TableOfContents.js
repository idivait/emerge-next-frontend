const replaceTOC = (articles) => {
    articles = articles.map((edge) => edge.node);

    // Generate HTML
    let toclist = "";
    toclist += "<div>";
    toclist += "<hr id='toc' />";
    toclist += "<h3>Table of Contents</h3>";
    toclist += "<ol class='tableofcontents'>";
    articles.forEach((post) => {
        toclist += "<li><span>";
        toclist += "<a class='title' href='/" + post.slug + "/'>";
        toclist += post.title;
        toclist += "</a>";
        toclist += "<br/> by ";
        toclist +=
            "<a class='author' href='/author/" +
            post.primary_author.slug +
            "/'>";
        toclist += post.primary_author.name;
        toclist += "</a>";
        toclist += "</span></li>";
    });
    toclist += "</ol>";
    toclist += "</div>";

    return toclist;
};

const tableOfContentsExt = (articles) => {
    if (!articles) return;
    return {
        type: "lang",
        regex: /\[TableOfContents\]/g,
        replace: replaceTOC(articles),
    };
};

export default tableOfContentsExt;
