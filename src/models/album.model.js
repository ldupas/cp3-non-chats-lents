const connection=require('../db-config');
const db= connection.promise();

const getAll=()=>{
    return db
        .query('SELECT * FROM album')
        .then(([result])=>{
            return result;
        })
        .catch((err)=>{
            console.log(err);
        })
}

const getOne=(id)=>{
    return db
        .query('SELECT * FROM album WHERE id=?',[id])
        .then(([result])=>{
            return result[0];
        })
        .catch((err)=>{
            console.log(err);
        })
}

const create=({title,genre, picture,artist})=>{
    return db
        .query("INSERT INTO album (title,genre,picture,artist) VALUES(?,?,?;?)",[
            title,
            genre,
            picture,
            artist
        ])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err)=>{
            console.log(err);
        })
}

const update=(data,id)=>{
    return db
        .query("UPDATE album SET ? WHERE id=?",[data,id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
        })
}

const destroy=(id)=>{
    return db
        .query("DELETE FROM album WHERE id=?",[id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
        })
}

const getTrackFromAlbum=(id)=>{
    return db
        .query("SELECT t.id as id_track FROM track t INNER JOIN album ON t.id_album=album.id WHERE album.id=?",[id])
        .then(([result])=>{
            return result;
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports={
    getAll,
    getOne,
    create,
    update,
    destroy,
    getTrackFromAlbum
}