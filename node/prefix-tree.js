const words = ["apple", "banana", "bat", "cat", "dog", "donut"]

function insert(tree, word) {
    let t = tree
    for (let i = 0; i < word.length; i++) {
        const w = word[i]

        if (!t[w]) {
            t[w] = {}
        }
        t = t[w]
    }
}

function search(tree, word) {
    let t = tree

    for (let i = 0; i < word.length; i++) {
        if (!t) {
            return []
        }
        t = t[word[i]]
    }

    const res = collect(t)

    if (res.length == 0) {
        return []
    }

    return res.sort().map((suffix) => word + suffix)
}

function collect(tree) {
    if (!tree) {
        return []
    }

    const q = []
    const paths = []

    let path = ""
    let up = false
    q.push(["", 0, tree])

    while (q.length > 0) {
        const [k, level, node] = q.pop()

        if (up) {
            path = path.slice(0, level - 1)
            up = false
        }

        path += k
        // console.log(level, k, node, path)

        const keys = Object.keys(node)

        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]
                q.push([k, level + 1, node[k]])
            }
        } else {
            paths.push(path)
            up = true
        }
    }

    return paths
}

async function main() {
    const tree = {}

    for (const word of words) {
        insert(tree, word)
    }

    console.log(JSON.stringify(tree, null, 4))

    const res = search(tree, "banana")
    console.log(res)
}

main()
