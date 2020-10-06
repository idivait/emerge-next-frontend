import { buildOpts, editImage } from '.'

const preloadImage = (src, lgOpts) => {
    const full = editImage(src, buildOpts(lgOpts || { w: 1400 }))
    const imageLoader = new Image()
    imageLoader.src = full

    return new Promise((res)=>{
        imageLoader.onload = () => {
            res(full)
        }
    })
}

export default preloadImage