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
    caller_4 text,
    home_address text
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
-- Name: users; Type: TABLE; Schema: public; Owner: reception; Tablespace: 
--

CREATE TABLE users (
    empid text NOT NULL,
    password text DEFAULT md5('acquire123#'::text),
    firstname text NOT NULL,
    lastname text NOT NULL,
    visibility boolean DEFAULT true,
    archived boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO reception;

--
-- Name: pk; Type: DEFAULT; Schema: public; Owner: reception
--

ALTER TABLE ONLY calllogs ALTER COLUMN pk SET DEFAULT nextval('calllog_pk_seq'::regclass);


--
-- Name: calllog_pk_seq; Type: SEQUENCE SET; Schema: public; Owner: reception
--

SELECT pg_catalog.setval('calllog_pk_seq', 17, true);


--
-- Data for Name: calllogs; Type: TABLE DATA; Schema: public; Owner: reception
--

COPY calllogs (pk, createdby, datecreated, landline, caller_4, home_address) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: reception
--

COPY users (empid, password, firstname, lastname, visibility, archived) FROM stdin;
1	c4ca4238a0b923820dcc509a6f75849b	System	Admin	t	f
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

