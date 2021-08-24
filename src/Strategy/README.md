
# Strategy
The Strategy pattern is a behavioral design pattern that lets you set a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

## Problem
Imagine you have a group of scientists who want a set of data converted from a database to be able to interface with different systems. One wants a JSON object, One wants a CSV, one wants binary strings, and in the future others may want other formats as well.

## Solution
The strategy pattern solves this problem by letting you define a family of classes which all implement the same strategy interface (in this case, lets say it has a single method called convert). The original consuming class is defined to store a reference to the conversion strategy and calls the referenced strategy class with the convert method. This consuming class doesn't know which strategy does the conversion, it just references the context that was set. The consuming class has a method to change the strategy dynamically and the client consumer of that class can set the strategy they want.
