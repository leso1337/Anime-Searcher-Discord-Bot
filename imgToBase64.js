var imgToBase64 = async function (src) {
    const resizedImageBuf = await require('sharp')(src)
        .png()
        .resize(720, 480)
        .toBuffer();
    return `data:image/png;base64,${resizedImageBuf.toString('base64')}`
}
module.exports = imgToBase64;