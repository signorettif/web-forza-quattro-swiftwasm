// swift-tools-version:5.3
import PackageDescription
let package = Package(
    name: "web-forza-quattro-swiftwasm",
    products: [
        .executable(name: "web-forza-quattro-swiftwasm", targets: ["web-forza-quattro-swiftwasm"])
    ],
    dependencies: [
        .package(name: "JavaScriptKit", url: "https://github.com/swiftwasm/JavaScriptKit", from: "0.9.0")
    ],
    targets: [
        .target(
            name: "web-forza-quattro-swiftwasm",
            dependencies: [
                .product(name: "JavaScriptKit", package: "JavaScriptKit")
            ])
    ]
)