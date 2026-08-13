const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drkncbjka',
  api_key: '518869881132572',
  api_secret: 'Qrc070-mSssF5x3cMjXzcaKVgdc'
});

async function testUpload() {
  try {
    console.log('Pinging Cloudinary...');
    const result = await cloudinary.api.ping();
    console.log('Ping successful:', result);

    console.log('Testing upload...');
    const uploadResult = await cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    console.log('Upload successful:', uploadResult.secure_url);
    
    // Clean up
    await cloudinary.uploader.destroy(uploadResult.public_id);
    console.log('Test file cleaned up.');
  } catch (error) {
    console.error('Cloudinary Error:', error);
  }
}

testUpload();
