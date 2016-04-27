/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

// GCM API Key
// AIzaSyAWgCdIi8VP9qqN8gfNIt41GK-WhRC4Xgo
// Project Number
// 546762979088
// https://android.googleapis.com/gcm/send/cB20XudAfzg:APA91bGk35ijTJtzZGTrKf9w4d4l4fcnhtUOoNbcht9xW3UfpN_vAFqepi1xM5hGjglOpAfRIDv4cjg768ZPI1fgJR8hUFaUexGmaVsHyBKkV-IeS7d1DZ4SxNDsM2G0pQiHEfkKRyGy
// SubscriptionId
// cB20XudAfzg:APA91bGk35ijTJtzZGTrKf9w4d4l4fcnhtUOoNbcht9xW3UfpN_vAFqepi1xM5hGjglOpAfRIDv4cjg768ZPI1fgJR8hUFaUexGmaVsHyBKkV-IeS7d1DZ4SxNDsM2G0pQiHEfkKRyGy
// curl command
// curl --header "Authorization: key=AIzaSyAWgCdIi8VP9qqN8gfNIt41GK-WhRC4Xgo" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"cB20XudAfzg:APA91bGk35ijTJtzZGTrKf9w4d4l4fcnhtUOoNbcht9xW3UfpN_vAFqepi1xM5hGjglOpAfRIDv4cjg768ZPI1fgJR8hUFaUexGmaVsHyBKkV-IeS7d1DZ4SxNDsM2G0pQiHEfkKRyGy\"]}"


'use strict';

console.log('started ', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  var title = 'Push Message';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    }));
});
self.addEventListener('notificationclick', function(event) {
  console.log('Notification Click: tag ', event.notification.tag);
  event.notification.close();
  var url = 'https://www.google.com';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
