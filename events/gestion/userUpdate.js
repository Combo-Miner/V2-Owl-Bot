const client = require("../../index")
const users = require("../../models/users")

client.on("userUpdate", async (oldUser,newUser)=>{
    if(oldUser.username !== newUser.username || oldUser.discriminator !== newUser.discriminator) {
        users.findOne({
            User : oldUser.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new users({
                    User: oldUser.id,
                    content: [{
                        username : `${oldUser.username}#${oldUser.discriminator}`,
                        date :  Date.parse(new Date) / 1000
                    }]
                })
            } else {
                const object = {
                    username : `${oldUser.username}#${oldUser.discriminator}`,
                    date :  Date.parse(new Date) / 1000
                }
                data.content.push(object)
            }
            data.save()
            console.log(newUser.username)

        })

   
}
})