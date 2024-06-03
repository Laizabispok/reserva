import multer from 'multer'
import path from 'path'

export default {
    setorage: multer.diskStorage({
        destination:path.resolve(__dirname, '..', '..', 'uploads'), filename:( req, res, cb) => {
        const ext = path.extname(file.orignalname);
        const name = path.basename(file.orignalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`)

        
        },
    })
}