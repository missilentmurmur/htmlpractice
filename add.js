const add = (a) => (b) => {
    return a + b;
};

add(3,4);

const f = add(3);
f(2);
