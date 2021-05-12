# MurAll Event Processor

- [Introduction](#introduction)
- [Installation](#installation)
- [Exposed funcionality](#exposed-funcionality)
- [Feedback](#feedback)

## Introduction

Convert the MurAll smart contract `Painted` events into pixel data.

## Installation
````
npm install @murall/event-processor
````
This package is written in TypeScript, but can be included in any javascript project

## Exposed funcionality

* `PaintedEvent` - TypeScript type for the `Painted` log event data

* `Metadata` - TypeScript type for the token metadata

* `extract(event: LogEvent): PaintedEvent` -  Extracts encoded pixel data from the smart contract log event

* `process(event: PaintedEvent)` - Decodes the extracted data into pixel data, consisting of the pixel coordinate and color, that can be drawn onto a [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

* `parseMetadata(event: PaintedEvent)` - Parses the metadata in the `PaintedEvent` to return the `name`, `number`, `seriesId` and `hasAlpha` properties. Raw metadata is just a string array


## Feedback

Feel free to [file an issue](https://github.com/murall-art/event-processor/issues/new). Feedback is always welcome.

If there's anything you'd like to chat about, please feel free to join our [Discord](https://discord.gg/vtRGyzeFhe)!
