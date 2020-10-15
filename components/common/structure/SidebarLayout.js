export const SidebarLayout = ({ featured, content, sidebar }) => (
    <main id="content" className="content" role="main">
        <div className="container container-masonry">
            <div className="inner">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="row posts-grid">
                            <div className="box carousel-wrapper">{featured}</div>
                            {content}
                        </div>
                        {/* TODO: Fix Pagination component */}
                        {/* <div className="row">
                        <Pagination
                            pageContext={pageContext}
                            className="col-sm-12"
                        />
                    </div> */}
                    </div>
                    <div className="col-sm-3">{sidebar}</div>
                </div>
            </div>
        </div>
    </main>
);

export default SidebarLayout;
