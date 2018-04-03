const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

require('./routes/api/users.test.js')(chai, expect)
require('./routes/api/blog-posts.test.js')(chai, expect)
require('./routes/api/announcements.test.js')(chai, expect)
require('./routes/api/pages.test.js')(chai, expect)
require('./routes/api/resources.test.js')(chai, expect)
require('./routes/api/team.test.js')(chai, expect)