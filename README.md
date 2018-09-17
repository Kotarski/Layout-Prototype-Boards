# Layout-Prototype-Boards

The aim of this project was to create software to help its users learn how to design physical circuits on prototyping boards. The software allows users to build circuits on a virtual breadboard or stripboard from provided schematics. The virtual build process mimics the real-world process as closely as possible, but the software provides additional feedback to help reduce the impact of mistakes, teach the users about board connectivity, and identify issues without the need of outside help. The software is written in JavaScript, so it can easily be hosted online and accessed remotely by users on a wide range of platforms. Circuit designs can be saved, so users can continue their work across sessions. Both large and small size breadboards are supported, as are arbitrarily-sized stripboards, to which track breaks can be added on the reverse. 

The following components are currently supported:
  Wires,
  Resistors,
  Capacitors,
  Inductors,
  Diodes,
  OpAmps (Including Dual),
  Power Supplies, 
  Bipolar Transistors

More can be added (fairly) easily, so I may be able to add new components on request.

# How To Use

This tool has only been tested in Chrome. It is unlikely to work in other browsers.

You will need to download the HTML, CSS, compiledJS and sample_files folders. Unfortunately currently a mechanism to generate your own schematic files has not been implemented, so only those in the sample_files folder are available (the .dasim ones). 

Simply open the the HTML file, and load a sample file.

# Sample Images

![Checking a Circuit Gif](/sample_images/CheckingACircuit.gif)

![Flasher Breadboard Circuit](/sample_images/Flasher.png)

![Pin Name Hints](/sample_images/PinGuides.png)
