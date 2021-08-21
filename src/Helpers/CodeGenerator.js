async function generateCode(kodenegaraasal) {
    try {
        let arrnumber = '0123456789'.split('')
        let string = 'abcdefghijklmnopqrstuvwxyz'
        let arrupstring = string.toUpperCase().split('')
        let newPass = kodenegaraasal + '-'
        let num
        let upstr
        let rand
        while (newPass.length <= 8) {
            num = Math.floor(Math.random() * 9)
            upstr = Math.floor(Math.random() * 25)
            rand = (arrupstring[upstr] + arrnumber[num]).split('')
            newPass = newPass + rand[Math.floor(Math.random() * 3)]
        }
        const result = newPass.slice(0,8)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = generateCode