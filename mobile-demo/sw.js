/* Migration worker for installations that previously used the mobile-demo scope. */
const BUILD_ID='9A-20260823-232339';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.registration.unregister().then(()=>self.clients.matchAll({type:'window'})).then(clients=>Promise.all(clients.map(client=>client.navigate(client.url))))));
