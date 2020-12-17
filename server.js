const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

//port access this api
const port = process.env.PORT || 2020;

//collection that use to manage data
var koleksi = 'sapi';

let serviceAccount = require('./key.json');
const { text } = require('body-parser');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

//use cors
app.use(cors({ origin: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//hello world
app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});

// //read all sapi
// app.get('/api/read', (req, res) => {
//     db.collection(koleksi).get()
//         .then(querySnapshot => {
//             if (querySnapshot.empty) {
//                 res.send("NO SERVERS AVAILABLE");
//             } else {
//                 var docs = querySnapshot.docs.map(doc => doc.data());
//                 console.log('Document data:', docs);
//                 res.end(JSON.stringify({ error: "", result: docs }));
//             }
//         });
// });

// read all
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection(koleksi);
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        tgl_lahir: doc.data().tgl_lahir,
                        breed: doc.data().breed,
                        jenis_kelamin: doc.data().jenis_kelamin,
                        umur: doc.data().umur,
                        tgl_datang: doc.data().tgl_datang,
                        tgl_keluar: doc.data().tgl_keluar,
                        tanda_sapi: doc.data().tanda_sapi,
                        berat_badan: doc.data().berat_badan,
                        u_bunting: doc.data().u_bunting,
                        p_lahir: doc.data().p_lahir,
                        status_vaksin: doc.data().status_vaksin,
                        o_cacing: doc.data().o_cacing,
                        riwayat_kasus: doc.data().riwayat_kasus,
                        temperatur: doc.data().temperatur,
                        tonus_rumen: doc.data().tonus_rumen,
                        inseminasi: doc.data().inseminasi,
                        pengobatan: doc.data().pengobatan,
                        lokasi: doc.data().lokasi
                    };
                    response.push(selectedItem);
                }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read item
app.get('/api/read/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection(koleksi).doc(req.params.item_id);
            let item = await document.get();
            let response = [];
            const selectedItem = {
                id: req.params.item_id,
                tgl_lahir: item.data().tgl_lahir,
                breed: item.data().breed,
                jenis_kelamin: item.data().jenis_kelamin,
                umur: item.data().umur,
                tgl_datang: item.data().tgl_datang,
                tgl_keluar: item.data().tgl_keluar,
                tanda_sapi: item.data().tanda_sapi,
                berat_badan: item.data().berat_badan,
                u_bunting: item.data().u_bunting,
                p_lahir: item.data().p_lahir,
                status_vaksin: item.data().status_vaksin,
                o_cacing: item.data().o_cacing,
                riwayat_kasus: item.data().riwayat_kasus,
                temperatur: item.data().temperatur,
                tonus_rumen: item.data().tonus_rumen,
                inseminasi: item.data().inseminasi,
                pengobatan: item.data().pengobatan,
                lokasi: item.data().lokasi
            };
            response.push(selectedItem);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
            await db.collection(koleksi).doc(req.body.id + '/').create({
                id: req.body.id,
                tgl_lahir: req.body.tgl_lahir,
                breed: req.body.breed,
                jenis_kelamin: req.body.jenis_kelamin,
                umur: req.body.umur,
                tgl_datang: req.body.tgl_datang,
                tgl_keluar: req.body.tgl_keluar,
                tanda_sapi: req.body.tanda_sapi,
                berat_badan: req.body.berat_badan,
                u_bunting: req.body.u_bunting,
                p_lahir: req.body.p_lahir,
                status_vaksin: req.body.status_vaksin,
                o_cacing: req.body.o_cacing,
                riwayat_kasus: req.body.riwayat_kasus,
                temperatur: req.body.temperatur,
                tonus_rumen: req.body.tonus_rumen,
                inseminasi: req.body.inseminasi,
                pengobatan: req.body.pengobatan,
                lokasi: req.body.lokasi
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// update
app.put('/api/update/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection(koleksi).doc(req.params.item_id);
            await document.update({
                id: req.body.id,
                tgl_lahir: req.body.tgl_lahir,
                breed: req.body.breed,
                jenis_kelamin: req.body.jenis_kelamin,
                umur: req.body.umur,
                tgl_datang: req.body.tgl_datang,
                tgl_keluar: req.body.tgl_keluar,
                tanda_sapi: req.body.tanda_sapi,
                berat_badan: req.body.berat_badan,
                u_bunting: req.body.u_bunting,
                p_lahir: req.body.p_lahir,
                //tambahan
                status_vaksin: req.body.status_vaksin,
                o_cacing: req.body.o_cacing,
                riwayat_kasus: req.body.riwayat_kasus,
                temperatur: req.body.temperatur,
                tonus_rumen: req.body.tonus_rumen,
                inseminasi: req.body.inseminasi,
                pengobatan: req.body.pengobatan,
                lokasi: req.body.lokasi
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// delete
app.delete('/api/delete/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection(koleksi).doc(req.params.item_id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});