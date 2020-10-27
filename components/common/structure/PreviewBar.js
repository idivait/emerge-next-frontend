import Link from 'next/link';
export const PreviewBar = (preview) => (
    <div id="preview">
        Preview Mode Enabled
        <Link href="/api/exit-preview">
            <button>Exit Preview Mode</button>
        </Link>
    </div>
);
export default PreviewBar;
