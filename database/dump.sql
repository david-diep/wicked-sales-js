--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartId", "productId", price, quantity) FROM stdin;
9	1	1999	2
10	2	1899	4
10	1	1999	2
11	1	1999	1
12	5	2099	1
13	5	2099	1
14	2	1899	2
15	5	2099	9
15	2	1899	1
16	2	1899	1
17	5	2099	2
18	1	1999	7
19	2	1899	4
19	4	2399	4
19	1	1999	20
20	2	1899	3
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-07-24 22:40:48.453624-07
6	2020-07-26 13:10:23.009761-07
7	2020-07-26 22:55:56.436335-07
8	2020-07-27 13:04:11.190812-07
9	2020-08-19 17:31:27.849174-07
10	2020-08-20 15:00:27.918228-07
11	2020-08-21 17:23:20.042708-07
12	2020-08-21 20:38:41.460398-07
13	2020-08-23 00:15:33.021367-07
14	2020-08-23 21:37:53.731129-07
15	2020-08-23 23:36:50.460258-07
16	2020-08-24 00:33:52.610189-07
17	2020-08-24 00:34:19.812354-07
18	2020-09-02 17:47:56.440923-07
19	2020-09-03 11:51:53.583682-07
20	2020-09-04 19:15:19.939332-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	7	David	123456789	123 Neverland	2020-07-26 22:57:28.474113-07
2	8	DAvid	000000	example1	2020-07-27 14:41:49.915274-07
3	11	David	asdf	asdf	2020-08-21 19:20:11.66213-07
4	14	asdf	asdf	asdf	2020-08-23 23:34:37.502087-07
5	15	sss	sss	ss	2020-08-24 00:26:09.977275-07
6	16	asdf	asdf	asdf	2020-08-24 00:34:08.03429-07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
5	Penguin	2099	/images/penguin.png	A Penguin Plushie. It's already wearing a tuxedo.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
1	Blue Shark	1999	/images/b-shark.png	A Blue Shark Plushie. You can feel its thirst for blood.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
2	Grey Shark	1899	/images/g-shark.png	A Grey Shark Plushie. The Fearsome Big Fish Catcher.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
3	Green Dinosaur	2199	/images/g-dino.png	A Green Dino Plushie. It's probably a herbavore, but don't let that fool you.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
4	Lion	2399	/images/lion.png	A Lion Plushie. It's mane is a sight to behold.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
6	Red Dinosaur	2099	/images/r-dino.png	A Red Dinosaur. Contrary to popular belief, it was more a scavenger than a predator.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
8	Rhino	2999	/images/rhino.png	A Rhino Plush. Don't be fooled, it's horn is soft too.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
9	Unicorn	3999	/images/unicorn.png	A Unicorn Plush. It is positively magical; magic not included.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
7	Sting Ray	1999	/images/ray.png	A Sting Ray Plush. Soft and has it's stingers removed.	An ideal companion for the bedside and couch. Made of premium plush fabrics; Feather PP cotton filler - Soft plush toys. High quality internals are comfortable to hold and support lumbar.  Not machine washable. Made in Vietnam.
\.


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 20, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 6, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

