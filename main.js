import './style.scss'

const cast = [
    { name: 'eleven' },
    { name: 'mike' },
    { name: 'lucas' },
    { name: 'max' },
    { name: 'dustin' },
    { name: 'will' },
    { name: 'steve' },
    { name: 'robin' },
    { name: 'eddie' },
    { name: 'erica' },
    { name: 'hopper' },
    { name: 'joyce' },
    { name: 'murray' },
    { name: 'jonathan' },
    { name: 'nancy' },
    { name: 'argyle' },
    { name: 'karen' },
]

const init = (cast) => {
    const carousel = document.querySelector('.carousel-container')
    const card = document.querySelector('.card-image')
    card.classList.add('animate')
    window.addEventListener('animationend', () => {
        card.classList.remove('animate')
    })
    cast.forEach((character, index) => {
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        img.src = `./src/webp/${character.name}.webp`
        figure.classList.add('carousel-item')
        figure.appendChild(img)
        figure.dataset.id = index
        carousel.appendChild(figure)
        document.querySelector(`[data-id="0"]`).classList.add('active')
    })
}
const actionInit = (cast) => {
    const card = document.querySelector('.card-image')
    const cardBg = document.querySelector('.card')
    const carousel = document.querySelector('.carousel-container')
    const images = [...document.querySelectorAll('.carousel-item')]
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    let imageWidth = 94
    let gap = 32
    let currentPosX = 0
    let currentIndex = 0
    let interval
    let timer = 3000
    card.style.backgroundImage = `url('./src/webp/${cast[currentIndex].name}@2x.webp')`
    images.forEach((image, index) => {
        image.addEventListener('click', (e) => {
            if (images.length - 1 >= index) {
                if (!e.currentTarget.classList.contains('active')) {
                    moveNext(index)
                }
                images.forEach((image) => image.classList.remove('active'))
                image.classList.add('active')
                card.style.backgroundImage = `url('./src/webp/${
                    cast[+currentIndex + 1].name
                }@2x.webp')`
                cardBg.style.backgroundImage = `url('./src/webp/${
                    cast[+currentIndex].name
                }@2x.webp')`
                card.classList.add('animate')
                window.addEventListener('animationend', () => {
                    card.classList.remove('animate')
                })
                currentIndex = index
                currentPosX = (imageWidth + gap) * index
            }
        })
    })
    carousel.addEventListener('mouseover', () => {
        clearInterval(interval)
        interval = null
    })
    carousel.addEventListener('mouseout', () => {
        autoPlay()
    })
    prevButton.addEventListener('click', () => {
        let elem
        if (currentIndex > 0) {
            elem = document.querySelector(`[data-id="${currentIndex - 1}"]`)
            images.forEach((image) => image.classList.remove('active'))
            elem.classList.add('active')
            cardBg.style.backgroundImage = `url('./src/webp/${
                cast[+currentIndex].name
            }@2x.webp')`
            card.style.backgroundImage = `url('./src/webp/${
                cast[+currentIndex - 1].name
            }@2x.webp')`
            card.classList.add('animate')
            window.addEventListener('animationend', () => {
                card.classList.remove('animate')
            })
            currentIndex--
            movePrev(currentIndex)
        }

        clearInterval(interval)
        interval = null
        setTimeout(() => autoPlay(), timer)
    })

    nextButton.addEventListener('click', () => {
        moveHandler()
        clearInterval(interval)
        interval = null
        setTimeout(() => autoPlay(), timer)
    })

    function moveHandler() {
        let elem
        if (currentIndex >= 0 && images.length - 1 > currentIndex) {
            elem = document.querySelector(`[data-id="${+currentIndex + 1}"]`)
            images.forEach((image) => image.classList.remove('active'))
            elem.classList.add('active')
            card.style.backgroundImage = `url('./src/webp/${
                cast[+currentIndex + 1].name
            }@2x.webp')`
            cardBg.style.backgroundImage = `url('./src/webp/${
                cast[+currentIndex].name
            }@2x.webp')`
            card.classList.add('animate')
            window.addEventListener('animationend', () => {
                card.classList.remove('animate')
            })
            currentIndex++
            return moveNext(currentIndex)
        }
        currentIndex = 0
        elem = document.querySelector(`[data-id="${+currentIndex}"]`)
        images.forEach((image) => image.classList.remove('active'))
        elem.classList.add('active')
        card.style.backgroundImage = `url('./src/webp/${
            cast[+currentIndex].name
        }@2x.webp')`
        cardBg.style.backgroundImage = `url('./src/webp/${
            cast[images.length - 1].name
        }@2x.webp')`
        card.classList.add('animate')
        window.addEventListener('animationend', () => {
            card.classList.remove('animate')
        })
        return moveNext(currentIndex)
    }

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
        if (currentPosX >= 0) {
            carousel.style.transform = `translateX(-${
                (imageWidth + gap) * currentIndex
            }px)`
        }
    }

    const autoPlay = () => {
        if (!interval) {
            interval = setInterval(moveHandler, timer)
        }
    }
    autoPlay()
}
window.addEventListener('DOMContentLoaded', () => init(cast))
window.addEventListener('load', () => actionInit(cast))
