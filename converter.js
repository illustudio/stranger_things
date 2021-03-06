import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

    ;

(async () => {
    await imagemin(['src/*.{jpg,png}'], {
        destination: 'src/assets',
        plugins: [imageminWebp({quality: 80})],
    })

    console.log('Images optimized')
})()
