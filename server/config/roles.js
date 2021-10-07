const accessControl = require('accesscontrol');

let grantsObject = {
    admin:{
        profile:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*']
        }
    },
    user:{
        profile: {
            'read:own':['*'],
            'update:own':['*'],
        }
    }
}

const roles = new accessControl(grantsObject);

module.exports = {roles}