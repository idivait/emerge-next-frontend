import { Pagination } from '@components/common/structure';
export const SidebarLayout = ({ featured, content, sidebar, pageContext }) => (
    <main id="content" className="content" role="main">
        <div className="container container-masonry">
            <div className="inner">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="posts-grid">
                            <div className="box carousel-wrapper">{featured}</div>
                            {content}
                            </div>
                        </div>
                        {/* TODO: Fix Pagination component */}
                        {pageContext && (
                            <div className="row">
                                <Pagination className="col-sm-12" {...pageContext} />
                            </div>
                        )}
                    </div>
                    <div className="col-sm-3">{sidebar}</div>
                </div>
            </div>
        </div>
    </main>
);

export default SidebarLayout;
