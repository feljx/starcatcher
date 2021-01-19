'use strict'
const Klingel = function () {
	const sounds = {}
	let defaultVolume
	this.load = function (name, url) {
		// console.log(`Klingel: Loading ${name} from ${url}`)
		sounds[name] = new Audio(url)

		const execute_on_audio_event = function (resolve, reject) {
			sounds[name].addEventListener('canplaythrough', resolve)
			sounds[name].addEventListener('error', function () {
				const msg = `Audio loading failed – verify audio URL (if using "loadMultiple" check that placeholder is correctly specified)`
				const { code, message } = sounds[name].error
				reject(new Error(msg))
				console.warn('Detailed Error:', code, message)
			})
		}
		return new Promise(execute_on_audio_event)
	}
	this.loadMultiple = function (names, urlTemplate, placeholder) {
		const template = urlTemplate.split(placeholder || '_NAME_')
		const toLoadedPromises = (name) => this.load(name, template.join(name))
		const loaded = names.map(toLoadedPromises)
		return Promise.all(loaded)
	}
	this.remove = function (name) {
		const was_deleted = sounds[name] && delete sounds[name]
		// console.log(`Klingel: Removal of ${name} ${was_deleted ? 'successful' : 'failed'}`)
		return was_deleted
	}
	this.setDefaultVolume = function (volume) {
		if (typeof volume === 'number') {
			defaultVolume = volume
		} else {
			throw new Error('Wrong argument type invoking "setDefaultVolume": volume must be a number')
		}
	}
	this.setVolume = function (volume, name) {
		sounds[name].volume = volume
	}
	this.getSounds = function () {
		return Object.keys(sounds)
	}
	this.play = function (name, volume) {
		// console.log(`Klingel: Playing ${name}`)
		const sound = sounds[name]

		if (sound) {
			const tempSound = sound.cloneNode(true)
			const ownVolumeSet = tempSound.volume !== 1
			const tempVolume = (typeof volume === 'number' && volume) || (ownVolumeSet && sound.volume) || defaultVolume
			if (tempVolume) {
				tempSound.volume = tempVolume
			}
			return tempSound.play()
		} else {
			return Promise.resolve(new Error(`Sound not found: "${name}"`))
		}
	}
}

export default Klingel
