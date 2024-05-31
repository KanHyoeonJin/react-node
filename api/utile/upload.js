import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const imgUrl=path.join(__dirname,'../');

const uploadDir=path.join(imgUrl,'uploads');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        console.log("fadf")
        cb(null, Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({storage:storage});
export default upload;