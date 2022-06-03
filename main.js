import './style.scss'

window.addEventListener('load', () => {
    const carousel = document.querySelector('.carousel-container')
    const images = [...document.querySelectorAll('.carousel-item')]
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    let imageWidth = 94
    let gap = 32
    let currentPosX = 0
    let currentIndex = 0

    images.forEach((image, index) => {
        // data-id 에 index 설정
        image.dataset.id = String(index)

        image.addEventListener('click', (e) => {
            if (images.length - 1 >= index) {
                if (!e.currentTarget.classList.contains('active')) {
                    moveNext(index)
                }
                images.forEach((image) => image.classList.remove('active'))
                image.classList.add('active')
                currentIndex = index
                currentPosX = (imageWidth + gap) * index
            }
        })
    })

    prevButton.addEventListener('click', () => {
        if (currentIndex === null) {
            currentIndex = 0
        }
        if (currentIndex > 0) {
            const elem = document.querySelector(
                `[data-id="${currentIndex - 1}"]`
            )
            images.forEach((image) => image.classList.remove('active'))
            elem.classList.add('active')
            currentIndex--
            movePrev(currentIndex)
        }
    })

    nextButton.addEventListener('click', () => {
        if (currentIndex === null) {
            currentIndex = 0
        }
        if (currentIndex >= 0 && images.length - 1 > currentIndex) {
            const elem = document.querySelector(
                `[data-id="${+currentIndex + 1}"]`
            )
            images.forEach((image) => image.classList.remove('active'))
            elem.classList.add('active')
            currentIndex++
            moveNext(currentIndex)
        }
    })

    function moveNext(currentIndex) {
        currentPosX = Math.abs(+currentPosX + (imageWidth + gap))
        if (currentPosX >= 0)
            carousel.style.transform = `translateX(-${
                (imageWidth + gap) * currentIndex
            }px)`
    }

    function movePrev(currentIndex) {
        currentPosX = +currentPosX - (imageWidth + gap)
        if (currentPosX < 0) return (currentPosX = 0)
        if (currentPosX > 0 || currentIndex === 0) {
            carousel.style.transform = `translateX(-${
                (imageWidth + gap) * currentIndex
            }px)`
        }
    }
})
