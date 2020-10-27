export const ColRow = ({ cols }) => {
    const num = cols.length;
    return (
        <div className="row">
            {cols.map(({ title, content }, i) => (
                <div key={i} className={`col-sm-${12 / num} ${title}`}>
                    {content}
                </div>
            ))}
        </div>
    );
};

export default ColRow;
