/* eslint-disable no-plusplus */
const parseUnsplash = (image, options) => {
    const queryString = `?${image.split(`?`)[1]}`;
    const imageParams = new URLSearchParams(queryString);

    for (let key in options) {
        imageParams.set(key, options[key]);
    }

    return `${image.split(`?`)[0]}?${imageParams.toString()}`;
};

const parseCloudinary = (image, options) => {
    //Ex cloudinary: https://res.cloudinary.com/demo/image/upload/w_250,h_250,c_mfit/sample.jpg

    let cOpts = { ...options };
    let cText = ``;
    image = image.toLowerCase();

    //pull out image url and original options
    let regex = /(.*\/image\/upload\/)(?:q_auto){0,1}(?:[a-zA-Z]|\_|\d|\,)*(\/.*\.(?:jpg|jpeg|gif|webm))/gm;

    //convert bt unsplash and cloudinary
    if (!options.portrait) {
        if (options.crop.indexOf(`faces`) > -1) {
            cText += `g_faces,`;
        }
        if (options.crop.indexOf(`entropy`) > -1) {
            cText += `g_auto,`;
        }

        if (options.fit === `crop`) {
            cOpts.c = `thumb`;
        }
        if (options.auto === `format`) {
            cOpts.f = `auto`;
        }
        if (!options.q) {
            cOpts.q = `auto`;
        }
    }
    if (options.portrait) {
        cText += `c_thumb,g_faces,`;
    }

    // eslint-disable-next-line no-unused-vars
    let c = 0;
    for (let opt in cOpts) {
        if (opt.length === 1 && cOpts[opt]) {
            cText += `${opt}_${cOpts[opt]},`;
        }
        c++;
    }

    const parseImg = image.replace(regex, `$1${cText.slice(0, -1)}$2`);

    return parseImg;
};

const editImage = (image, options) => {
    const localReg = /(.*\/)(?:content\/images)(\/.*\.(?:jpg|jpeg|gif|webm)(?:\/){0,1})/gm;
    const isLocal = image && image.match(localReg);
    if (!image || !options) {
        return image;
    }
    if (isLocal) {
        const localToCloud = image.replace(
            localReg,
            "https://res-1.cloudinary.com/emerge-magazine/image/upload/q_auto/v1/blog-images/$2"
        );
        return parseCloudinary(localToCloud, options);
    }
    if (image.indexOf(`unsplash.com`) < 0 && image.indexOf(`cloudinary.com`) < 0) {
        console.log(`unsplash procs: ${image}`);
        return image;
    }
    if (image.indexOf(`unsplash.com`) >= 0) {
        return parseUnsplash(image, options);
    }
    if (image.indexOf(`cloudinary.com`) >= 0) {
        console.log(`cloudinary procs: ${image}`);
        return parseCloudinary(image, options);
    }
};

export default editImage;
