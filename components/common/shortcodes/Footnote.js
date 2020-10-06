const footnoteExt = () => {
    return {
        type: "lang",
        regex: /\^(\d)+\^/gm,
        replace: `<sup>$1</sup>`,
    };
};

export default footnoteExt;
