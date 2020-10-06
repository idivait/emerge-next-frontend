const buildOpts = (opts) => {
    let imageOpts = {
        crop: `faces,entropy`, 
        fit: `crop`,
        auto: `format`,
    }
    imageOpts.h = opts.h
    imageOpts.w = opts.w
    imageOpts.q = opts.q
    imageOpts.portrait = opts.portrait

    return imageOpts
}

export default buildOpts