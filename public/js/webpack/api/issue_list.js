module.exports = () => {
    var archives = jQuery(`#archives`);
    const ISSUE = process.env.GHOST_PRIMARY_ISSUE;
    fetch(ghost.url.api(`tags`, { limit: `all`, filter: `visibility:internal` }))
        .then((body) => body.json())
        .then((json) => {
            json.tags.forEach(function (tag) {
                if (tag.name !== ISSUE) {
                    archives.append(
                        `<li class="cat-item"><a href="/tag/` +
                            tag.slug +
                            `">` +
                            tag.name.slice(1) +
                            `</a></li>`
                    );
                }
            });
        });
};
