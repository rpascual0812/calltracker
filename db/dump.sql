--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: calllogs; Type: TABLE; Schema: public; Owner: reception; Tablespace: 
--

CREATE TABLE calllogs (
    pk integer NOT NULL,
    createdby text NOT NULL,
    datecreated timestamp with time zone DEFAULT now(),
    landline numeric,
    caller text,
    email text,
    category text
);


ALTER TABLE public.calllogs OWNER TO reception;

--
-- Name: calllog_pk_seq; Type: SEQUENCE; Schema: public; Owner: reception
--

CREATE SEQUENCE calllog_pk_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calllog_pk_seq OWNER TO reception;

--
-- Name: calllog_pk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reception
--

ALTER SEQUENCE calllog_pk_seq OWNED BY calllogs.pk;


--
-- Name: fields; Type: TABLE; Schema: public; Owner: reception; Tablespace: 
--

CREATE TABLE fields (
    field text NOT NULL,
    archived boolean DEFAULT false,
    datecreated timestamp with time zone DEFAULT now(),
    type text NOT NULL
);


ALTER TABLE public.fields OWNER TO reception;

--
-- Name: users; Type: TABLE; Schema: public; Owner: reception; Tablespace: 
--

CREATE TABLE users (
    empid text NOT NULL,
    password text DEFAULT md5('acquire123#'::text),
    firstname text NOT NULL,
    lastname text NOT NULL,
    visibility boolean DEFAULT true,
    archived boolean DEFAULT false,
    usertype text DEFAULT 'Agent'::text NOT NULL
);


ALTER TABLE public.users OWNER TO reception;

--
-- Name: pk; Type: DEFAULT; Schema: public; Owner: reception
--

ALTER TABLE ONLY calllogs ALTER COLUMN pk SET DEFAULT nextval('calllog_pk_seq'::regclass);


--
-- Name: calllog_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: reception
--

SELECT pg_catalog.setval('calllog_pk_seq', 35, true);


--
-- Data for Name: calllogs; Type: TABLE DATA; Schema: public; Owner: reception
--

COPY calllogs (pk, createdby, datecreated, landline, caller, email, category) FROM stdin;
25	1337008	2013-10-22 23:20:36.371023+08	434234	skjfklj	kjsdlkfjsd	\N
26	1337008	2013-10-22 23:21:30.925729+08	7281974	Rafael	Pasig	\N
27	1337008	2013-10-22 23:21:43.240011+08	7381974	Pascual	Pasig	\N
29	1337008	2013-10-26 10:02:47.803553+08	3434	sdfsdf	sdfsdfsdf	sdfsdfs
33	1332025	2013-10-26 16:55:40.04932+08	234234	dfgsdf	gsdfgsdf	\N
35	1337008	2013-10-26 20:26:42.163087+08	345345	eter	tertert	\N
\.


--
-- Data for Name: fields; Type: TABLE DATA; Schema: public; Owner: reception
--

COPY fields (field, archived, datecreated, type) FROM stdin;
email	f	2013-10-26 09:53:34.263106+08	text
landline	f	2013-10-26 09:53:19.099819+08	integer
caller	f	2013-10-26 09:53:29.434414+08	text
category	t	2013-10-26 09:53:40.244158+08	text
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: reception
--

COPY users (empid, password, firstname, lastname, visibility, archived, usertype) FROM stdin;
1337008	067f9a97c339b9221406a280ba901383	Rafael	Pascual	t	f	Agent
1332025	067f9a97c339b9221406a280ba901383	Fernandez	Jonabelle	f	f	Agent
1	c4ca4238a0b923820dcc509a6f75849b	System	Admin	t	f	Admin
1220000	067f9a97c339b9221406a280ba901383	Yo	Hey	t	t	Agent
\.


--
-- Name: calllog_pkey; Type: CONSTRAINT; Schema: public; Owner: reception; Tablespace: 
--

ALTER TABLE ONLY calllogs
    ADD CONSTRAINT calllog_pkey PRIMARY KEY (pk);


--
-- Name: users_empid_key; Type: CONSTRAINT; Schema: public; Owner: reception; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_empid_key UNIQUE (empid);


--
-- Name: calllog_createdby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reception
--

ALTER TABLE ONLY calllogs
    ADD CONSTRAINT calllog_createdby_fkey FOREIGN KEY (createdby) REFERENCES users(empid);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: calllogs; Type: ACL; Schema: public; Owner: reception
--

REVOKE ALL ON TABLE calllogs FROM PUBLIC;
REVOKE ALL ON TABLE calllogs FROM reception;
GRANT ALL ON TABLE calllogs TO reception;


--
-- PostgreSQL database dump complete
--

