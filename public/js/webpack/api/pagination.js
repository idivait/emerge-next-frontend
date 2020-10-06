function showPagination(pagination) {
    let pagination_el = jQuery("#pagination");
    // Play around with template literals.
    if (pagination_el) {
        let pagination_content = `<nav>`;
        if (pagination.page !== 1) {
            pagination_content += `<a href="${blogInfo.url}/page/1"><<</a>`;
        } else {
            pagination_content += `<<`;
        }
        if (pagination.prev) {
            pagination_content += ` <a href="${blogInfo.url}/page/${pagination.prev}"><</a> `;
        } else {
            pagination_content += ` < `;
        }

        for (let i = 1; i <= pagination.pages; i++) {
            pagination_content += `<span class="page_id">`;
            if (pagination.page === i) {
                pagination_content += `${i} `;
            } else {
                pagination_content += `<a href="${blogInfo.url}/page/${i}">${i}</a> `;
            }
            pagination_content += `</span>`;
        }
        if (pagination.next) {
            pagination_content += `<a href="${blogInfo.url}/page/${pagination.next}">></a>`;
        } else {
            pagination_content += `> `;
        }
        if (pagination.pages !== pagination.page) {
            pagination_content += `<a href="${blogInfo.url}/page/${pagination.pages}">>></a></nav>`;
        } else {
            pagination_content += `>>`;
        }
        pagination_el.append(pagination_content);
    }
}

module.exports = (blogInfo) => {
    if (blogInfo) {
        fetch(
            ghost.url.api("posts", {
                page: blogInfo.page,
                limit: blogInfo.posts_per_page,
            })
        )
            .then((body) => {
                return body.json();
            })
            .then((json) => {
                let pagination = json.meta.pagination;
                if (pagination.pages > 1) {
                    showPagination(pagination);
                }
            });
    }
};
