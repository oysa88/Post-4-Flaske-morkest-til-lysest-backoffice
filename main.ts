function RiktigLøsning () {
    soundExpression.giggle.play()
    Lysstyrke = 255
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 20; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 20; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
    }
    radio.sendString("R")
    basic.pause(2000)
    Initialize()
}
function Spille_på_flaskene () {
    if (Flaske == 1) {
        basic.showNumber(1)
        basic.pause(100)
    } else if (Flaske == 2) {
        basic.showNumber(2)
        basic.pause(100)
    } else if (Flaske == 3) {
        basic.showNumber(3)
        basic.pause(100)
    } else if (Flaske == 4) {
        basic.showNumber(4)
        basic.pause(100)
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("spill", 3)
    radio.sendValue("spill", 1)
    radio.sendValue("spill", 4)
    radio.sendValue("spill", 2)
})
function FeilLøsning () {
    soundExpression.sad.play()
    Lysstyrke = 255
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 20; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 20; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
    }
    basic.pause(2000)
    Initialize()
}
radio.onReceivedValue(function (name, value) {
    if (name == "spill") {
        Flaske = value
        Mottatt += 1
        Spille_på_flaskene()
        // eller hva det er du har bedt de skrive
        if (Flaske == riktigSekvens[fremskritt]) {
            fremskritt += 1
        } else {
            fremskritt = 0
            if (Mottatt == 4) {
                FeilLøsning()
            }
        }
        // her havner vi når vi har mottat hele sekvensen i riktig rekkefølge
        if (fremskritt == 4) {
            RiktigLøsning()
        }
    }
})
function Initialize () {
    Lysstyrke = 255
    fremskritt = 0
    Mottatt = 0
    strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
}
let Flaske = 0
let Lysstyrke = 0
let Mottatt = 0
let strip: neopixel.Strip = null
let riktigSekvens: number[] = []
let fremskritt = 0
fremskritt = 0
riktigSekvens = [
3,
1,
4,
2
]
strip = neopixel.create(DigitalPin.P0, 16, NeoPixelMode.RGB)
Mottatt = 0
radio.setGroup(1)
Initialize()
