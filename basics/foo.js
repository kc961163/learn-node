const args = process.argv;
if (args.length > 0) {
    args.forEach((v, i) => {
        if (i > 1) {        
            console.log(`${v}`)
    }
    });
}
else {
    console.log('Args not found');
}
