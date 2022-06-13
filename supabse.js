require('dotenv').config()
const supabase = require('@supabase/supabase-js');

const client = supabase.createClient('https://hawphvafdddzppaodijn.supabase.co', process.env.SUPABASE_KEY)

client.from('devices').select().then(({ data, error }) => {
    if (error) {
        return console.error(error)
    }
    console.log(`${data.length} devices registered`)
})

module.exports = {
    client,

    getDevices: async function () {
        const { data, error } = await client
            .from('devices')
            .select()
        if (error) {
            throw new Error(error)
        }
        return data
    },
    getDeviceState: async function ({ id }) {
        const { data, error } = await client
            .from('devices')
            .select('state').match({ id })
        if (error) {
            throw new Error(error)
        }
        return data
    },
    createDevice: async function () {
        const { data, error } = await client
            .from('devices')
            .insert([
                { state: true }
            ])
        if (error) {
            throw new Error(error)
        }
        return data
    },
    deleteDevice: async (filter) => {
        console.log('deleting:', filter)
        const { data, error } = await client
            .from('devices')
            .delete()
            .match(filter)
        if (error) {
            throw new Error(error)
        }
        return data
    }
}