const crypto = require('crypto');
  
// Calling randomBytes method with callback
crypto.randomBytes(8, (err, buf) => {
  if (err) {
    // Prints error
    console.log(err);
    return;
  }
  
  // Prints random bytes of generated data
  console.log("The random data is: "
             + buf.toString('hex'));
});