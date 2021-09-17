function RiktigLøsning() {
    Lysstyrke = 255
    radio.sendString("N")
    basic.showString("N", 0)
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 23; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 23; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }

    }

    //music.playMelody("C F A C5 - A C5 - ", 400)
    //basic.pause(1000)
    Initialize()
    basic.showIcon(IconNames.SmallHeart, 0)
}
function Spille_på_flaskene(hvilken: number) {
    if (hvilken == 1) {
        basic.showNumber(1, 0)
        pins.digitalWritePin(DigitalPin.P13, 1)
        basic.pause(pulseLength)
        pins.digitalWritePin(DigitalPin.P13, 0)
    } else if (hvilken == 2) {
        basic.showNumber(2, 0)
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P14, 1)

        basic.pause(pulseLength)
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)

    } else if (hvilken == 3) {
        basic.showNumber(3, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(pulseLength)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (hvilken == 4) {
        basic.showNumber(4, 0)
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(pulseLength)
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
    basic.pause(300)
    basic.showIcon(IconNames.SmallHeart, 10)
}
function FeilLøsning() {
    basic.showIcon(IconNames.Sad, 0)
    //music.playMelody("F C - - - - - - ", 400)
    Lysstyrke = 255
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 23; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 23; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
    }
    basic.showIcon(IconNames.SmallHeart, 0)
    basic.pause(1000)
    Initialize()
}
radio.onReceivedValue(function (name, value) {
    if (name == "spill") {
        Flaske = value
        Mottatt += 1
        Spille_på_flaskene(Flaske)
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
function Initialize() {
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
let pulseLength = 60
//music.playMelody("C F - - - - - - ", 400)
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart, 0)
fremskritt = 0
riktigSekvens = [3, 1, 4, 2]
strip = neopixel.create(DigitalPin.P1, 24, NeoPixelMode.RGB)
Mottatt = 0
radio.setGroup(4)
Initialize()
