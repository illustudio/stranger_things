import './style.scss'

const cast = [
    {
        name: 'eleven',
        description: "Eleven (Millie Bobby Brown) has never let anything stand in the way of protecting her friends. She’s used to overcoming challenges, but this new chapter finds her navigating the complexities of high school in California — along with the social world that comes with it."
    },
    {
        name: 'mike',
        description: "When we last saw Mike (Finn Wolfhard) in Season 3, he was saying goodbye to Eleven as she moved across the country with the Byers family. The two keep in touch by writing letters, with plans to see each other over spring break... and maybe fight a new evil along the way."
    },
    {
        name: 'lucas',
        description: "Most recently, Lucas (Caleb McLaughlin) and his friends helped save the day by defeating the Mind Flayer at the Starcourt Mall. With exceptional scouting and sleuthing skills, Lucas tries to stay one step ahead of danger in order to protect his buddies. When a darker and more ominous threat lands in Hawkins, he’ll have to be as ready as ever to jump into action."
    },
    {
        name: 'max',
        description: "Max (Sadie Sink) has been through a lot of changes in the past few years, beginning with her move to Hawkins and, most recently, enduring the loss of her stepbrother, Billy (Dacre Montgomery). The fourth season finds her grieving his passing... and uncovering plenty of darkness while trying to avenge his death."
    },
    {
        name: 'dustin',
        description: "While Dustin (Gaten Matarazzo) may be a high school freshman when Season 4 begins, he still plays D&D with his friends... and just might find himself wrapped up in a new adventure inside the mysterious and abandoned Creel House."
    },
    {
        name: 'will',
        description: "There’s no doubt that Will (Noah Schnapp) has been through a lot, what with being lost in the Upside Down and all. He finally made it out of Hawkins with his family, but it’s clear that plenty of horrors await him in sunny California, too."
    },
    {
        name: 'steve',
        description: "After cracking the case of what was lurking beneath the Starcourt Mall, Steve (Joe Keery) is ready for some time away from supernatural horrors while working at the video store alongside Robin. But nothing ever stays calm in Hawkins for long, and we can expect Steve — and his hair — to be pulled into the never-ending battle with the Upside Down once again."
    },
    {
        name: 'robin',
        description: "We first met Robin (Maya Hawke) in Season 3 when she was working at Scoops Ahoy with Steve. Now a fixture of the Demogorgon-slaying crew, Robin teams up with Nancy (finally!) in Season 4 while they investigate the dark secrets of the Creel House."
    },
    {
        name: 'eddie',
        description: "Stranger Things Season 4 introduces fans to Eddie (Joseph Quinn), the leader of the Hellfire Club, the D&D club within Hawkins High School. When our heroes sign up to join, Eddie eventually gets pulled into the supernatural dangers of Hawkins, too."
    },
    {
        name: 'erica',
        description: "You can’t spell America without Erica! Lucas’ little sister (Priah Ferguson) was introduced in Season 2 and quickly rose to fan-favorite status. With her quick wit, snappy comebacks and stealth skills, Erica was a central player in unlocking the secrets of the Starcourt Mall. At the end of Season 3, Dustin and Lucas gave her Will’s old Dungeons & Dragons set, encouraging her to embrace her inner nerd."
    },
    {
        name: 'hopper',
        description: "The end of Season 3 left some major questions about Hopper’s (David Harbour) fate unanswered, but the iconic police chief won’t give up that easily. Season 4 finds him far from home, battling an evil just as deadly as the ones he fought in Hawkins."
    },
    {
        name: 'joyce',
        description: "For as long as we’ve known her, Joyce (Winona Ryder) has stopped at nothing to protect her family. While she might be looking for a fresh start, there are plenty of mysteries — and dangers — that lie ahead."
    },
    {
        name: 'murray',
        description: "Murray (Brett Gelman) was introduced in Season 3 and quickly rose to fan-favorite status. With new threats of evil coming, he’ll have to work alongside Joyce to put a stop to the Upside Down once and for all."
    },
    {
        name: 'jonathan',
        description: "After helping to kill the Mind Flayer at Starcourt Mall, Jonathan (Charlie Heaton) has relocated to the West Coast with his mom, his brother and Eleven. While he might be hoping for a relaxing change of pace from the supernatural horrors of Hawkins, an entirely new danger soon finds him amid the sunshine and palm trees."
    },
    {
        name: 'nancy',
        description: "When we last caught up with Nancy (Natalia Dyer), she was exchanging a tearful goodbye with Jonathan as he moved to California with his family. In the fourth season, she joins forces with Robin to form a truly dynamic duo as they dig up horrific secrets about Hawkins and the Creel House."
    },
    {
        name: 'argyle',
        description: "Argyle (Eduardo Franco) joins the Stranger Things crew in Season 4 as Jonathan’s new best friend. He happily delivers pizzas and enjoys his laid-back Cali lifestyle — but getting mixed up with the Byers family will undoubtedly lead to trouble."
    },
    {
        name: 'karen',
        description: "Nancy and Mike’s mother, Karen (Cara Buono), has been relatively oblivious to the supernatural goings-on of her town — and children. But as darkness closes in on Hawkins, the Wheeler matriarch might be forced to reckon with the nightmarish truth that’s been surrounding her this whole time."
    },
]

const init = (cast) => {
    const carousel = document.querySelector('.carousel-container')
    const cardBg = document.querySelector('.card')
    const dimmedLayer = document.createElement('div')

    dimmedLayer.classList.add('dimmed')
    cardBg.appendChild(dimmedLayer)

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
const audioControl = () => {
    const audioButton = document.getElementById('audio')
    const audio = new Audio('./src/sound.webm')
    audioButton.addEventListener('click', (e) => {
        e.preventDefault()
        audio.play();
    })
}
const actionInit = (cast) => {
    const card = document.querySelector('.card-image')
    const cardBg = document.querySelector('.card')
    const carousel = document.querySelector('.carousel-container')
    const images = [...document.querySelectorAll('.carousel-item')]
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    const infoWrapper = document.createElement('div')
    const name = document.createElement('h2')
    const description = document.createElement('p')

    let imageWidth = 94
    let gap = 32
    let currentPosX = 0
    let currentIndex = 0
    let prevIndex
    let nextIndex
    let length = images.length - 1
    let interval
    let timer = 3500
    let elem


    // 목록 이미지 설정
    images.forEach((image, index) => {
        // 각 이미지를 클릭했을 경우
        image.addEventListener('click', (e) => {
            if (length >= index) {
                if (!e.currentTarget.classList.contains('active')) {
                    moveHandler(currentIndex)
                }
            }
        })
    })
    const addIndex = (index) => {
        // console.log(`addIndex에 들어온 index값 = ${index}`)
        currentIndex = +index
        if (currentIndex >= length) {
            currentIndex = 0
            prevIndex = length
            nextIndex = 0
            return
            // return console.log(`끝에 도달했을때 - nextIndex : ${nextIndex}, currentIndex : ${currentIndex}, prevIndex: ${prevIndex}`)

        }
        if (currentIndex === length) {
            return prevIndex = length - 1;
        }
        prevIndex = +currentIndex
        nextIndex = +currentIndex + 1
        currentIndex++
        // console.log(`addIndex - nextIndex : ${nextIndex}, currentIndex : ${currentIndex}, prevIndex: ${prevIndex}`)
    }
    const minusIndex = (index) => {
        currentIndex = +index
        if (+currentIndex === 0) {
            // console.log(`currentIndex가 0일때 minusIndex 값- nextIndex : ${nextIndex}, currentIndex : ${currentIndex}, prevIndex: ${prevIndex}`)
            prevIndex = length
            currentIndex = length
            nextIndex = 0
            return
        }
        if (+currentIndex < 0) {
            currentIndex = 0
            prevIndex = length
            nextIndex = 1
            currentIndex++
            return
        }


        prevIndex = +currentIndex - 1
        nextIndex = +currentIndex;
        currentIndex--
    }

    // 정보 삽입
    const addInfo = (target) => {
        name.innerText = cast[+target].name
        description.innerText = cast[+target].description
    }

    // 노드 삽입
    const insertInfoElement = () => {
        infoWrapper.classList.add('character')
        name.classList.add('character-name')
        description.classList.add('character-desc')
        infoWrapper.appendChild(name)
        infoWrapper.appendChild(description)
        card.appendChild(infoWrapper)
    }

    // 정보 삭제
    const removeInfo = () => {
        name.innerText = ''
        description.innerText = ''
    }


    // 마우스 올렸을 경우 자동 재생 멈춤
    cardBg.addEventListener('mouseover', () => {
        clearInterval(interval)
        interval = null
    })

    // 마우스 hover 해제시 자동 재생 재시작
    cardBg.addEventListener('mouseout', () => {
        autoPlay()
    })

    // 일시정지
    const pauseAutoPlay = () => {
        clearInterval(interval)
        interval = null
        setTimeout(() => autoPlay(), timer)
    }

    // 이전버튼
    prevButton.addEventListener('click', () => {
        minusIndex(currentIndex)
        // console.log(`prev버튼 클릭시 - nextIndex : ${nextIndex}, currentIndex : ${currentIndex}, prevIndex: ${prevIndex}`)
        pauseAutoPlay()
        cardImageHandler(currentIndex)
        // if (+currentIndex === 0) {
        //     backgroundHandler(cardBg, currentIndex)
        //     animationHandler()
        //     movePrev(currentIndex)
        //     return
        // }
        backgroundHandler(cardBg, nextIndex)
        animationHandler()
        movePrev(currentIndex)

    })

    // 다음버튼
    nextButton.addEventListener('click', () => {
        // console.log(`next버튼 클릭시 - nextIndex : ${nextIndex}, currentIndex : ${currentIndex}, prevIndex: ${prevIndex}`)
        addIndex(currentIndex)
        pauseAutoPlay()
        cardImageHandler(currentIndex)
        backgroundHandler(cardBg, prevIndex)
        animationHandler()
        moveNext(nextIndex)
    })

    // 이동 핸들러
    const moveHandler = () => {
        addIndex(currentIndex)
        if (currentIndex >= 0 && length > currentIndex) {
            cardImageHandler(nextIndex)
            backgroundHandler(cardBg, prevIndex)
            animationHandler()
            return moveNext(currentIndex)
        }
        cardImageHandler(currentIndex)
        backgroundHandler(cardBg, prevIndex)
        animationHandler()
        return moveNext(currentIndex)
    }

    // 다음이동
    const moveNext = (currentIndex) => {
        currentPosX = Math.abs(+currentPosX + (imageWidth + gap))
        if (currentIndex === 0) {
            carousel.style.transform = `translateX(0)`
            removeInfo()
            addInfo(nextIndex)
        }
        if (currentPosX > 0) {
            carousel.style.transform = `translateX(-${
                (imageWidth + gap) * currentIndex
            }px)`
            removeInfo()
            addInfo(nextIndex)

        }
    }

    // 이전이동
    const movePrev = (currentIndex) => {
        currentPosX = Math.abs(+currentPosX + (imageWidth + gap))
        if (currentIndex === 0) {
            // console.log(`currentIndex 가 0일때 들어오는 값 : ${currentIndex}`)
            carousel.style.transform = `translateX(0)`
            removeInfo()
            addInfo(prevIndex)
        }

        if (currentPosX >= 0) {
            carousel.style.transform = `translateX(-${
                (imageWidth + gap) * prevIndex
            }px)`
        }
        removeInfo()
        addInfo(prevIndex)
    }

    // 클래스 리셋
    const resetActiveHandler = (item) => {
        images.forEach((image) => image.classList.remove('active'))
        item.classList.add('active')
    }

    // 현재 배경화면
    const backgroundHandler = (elem, target) => {
        if (target < 0 || target === undefined || target === null) {
            target = 0
            // console.log(target)
        }
        elem.style.backgroundImage = `url('./src/webp/${
            cast[+target].name
        }@2x.webp')`
    }

    // 카드 이미지 삽입
    const cardImageHandler = (index) => {
        elem = document.querySelector(`[data-id="${+index}"]`)
        resetActiveHandler(elem)
        card.style.backgroundImage = `url('./src/webp/${
            cast[+index].name
        }@2x.webp')`
    }

    // 애니메이션 핸들러
    const animationHandler = () => {
        card.classList.add('animate')
        infoWrapper.classList.add('animate')
        window.addEventListener('animationend', () => {
            card.classList.remove('animate')
            infoWrapper.classList.remove('animate')
        })
    }


    // 자동재생
    const autoPlay = () => {
        if (!interval) {
            interval = setInterval(moveHandler, timer)
        }
    };

    autoPlay()
    // 첫 배경이미지 설정
    backgroundHandler(card, currentIndex)
    animationHandler()
    insertInfoElement()
    addInfo(currentIndex)
}
window.addEventListener('DOMContentLoaded', () => init(cast))
window.addEventListener('load', () => {
    actionInit(cast)
    audioControl()
})