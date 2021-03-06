:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

% Made by Luis Reis (ei12085@fe.up.pt) for LAIG course at FEUP.

port(8081).

% Server Entry Point
server :-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

% Server Loop 
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),
		
		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),
	
		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%original
parse_input(handshake, handshake).
parse_input(test(C,N), Res) :- test(C,Res,N).
parse_input(quit, goodbye).

test(_,[],N) :- N =< 0.
test(A,[A|Bs],N) :- N1 is N-1, test(A,Bs,N1).



%Game's
parse_input(retract_everything, retracted) :- retract_everything, 
													retractall(movevalid(_)),retractall(randommove(_)),
													retractall(randommovetype(_)),retractall(piecetype(_)),
													retractall(pieceposition(_)),retractall(targetposition(_)).
parse_input(assert_everything_else, asserted) :- 	assert(points_player_1(0)),
														assert(points_player_2(0)).
														
parse_input(difficulty(N), difficulty) :- assert(difficulty(N)).
parse_input(turn(N), turn) :- assert(turn(N)).
parse_input(chosen_board(N), chosen_board) :- assert(chosen_board(N)).
parse_input(player_1(SP, MP, LP), player1OK) :- assert(player_1(SP, MP, LP)).
parse_input(player_2(SP, MP, LP), player2OK) :- assert(player_2(SP, MP, LP)).
parse_input(board(C1,A1,C2,A2,C3,A3,C4,A4,C5,A5,C6,A6,C7,A7,C8,A8,C9,A9), L) :-  assert(board([cell(C1, A1), cell(C2, A2), cell(C3, A3),
																							  cell(C4, A4), cell(C5, A5), cell(C6, A6),
																							  cell(C7, A7), cell(C8, A8), cell(C9, A9)])),
																							  board(L).

parse_input(points_player_1,A) :- points_player_1(A).
parse_input(points_player_2,B) :- points_player_2(B).
parse_input(count_points_players, score_updated) :- count_points_players.

:- dynamic movevalid/1.
movevalid('FAIL').

parse_input(checkPlace(Piece,Position),checkPlace) :- ( (piece_exists(Piece),avaiable_pos_placement(Position)) 
																-> assert(movevalid('OK')) ; assert(movevalid('FAIL')) ).
parse_input(checkMove(Origin, Target), checkMove) :- (  (move_piece_modified(Origin, Target)) 
																-> assert(movevalid('OK')) ; assert(movevalid('FAIL')) ).

parse_input(moveValid,A) :- movevalid(A).

:- dynamic randommove/1.
:- dynamic randommovetype/1.
:- dynamic piecetype/1.
:- dynamic pieceposition/1.
:- dynamic targetposition/1.
randommove('FAIL').
randommovetype(0).

parse_input(random_move, (A,B,C,D) ) :- choose_random_move_modified,randommovetype(A),piecetype(B),pieceposition(C),targetposition(D).

parse_input(randommovetype,A) :- randommovetype(A).
parse_input(piecetype,A) :- piecetype(A).
parse_input(pieceposition,A) :- pieceposition(A).
parse_input(targetposition,A) :- targetposition(A).


%Override
move_piece_modified(P1, P2) :-
	(chosen_board(1), adjacent_1(P1, P2), !;
	(chosen_board(2), adjacent_2(P1, P2), !;
	(chosen_board(3), adjacent_3(P1, P2), !))),
	check_player_piece(P1, V1),
	check_if_not_tower(V1),
	check_enemy_player_piece(P2, V2),
	check_creates_tower(V1, V2, _).

choose_wise_move_modified :-
	choose_first_possible_move(P1, P2, V1, V2),
	check_creates_tower(V1, V2, _),
	!;
	choose_placement_board(P, V),
	choose_piece_acordingly(V, X),
	!;
	choose_random_piece(X),
	piece_exists(X),
	choose_random_position(P),
	!.
	
choose_random_move_modified :-
	random(0, 2, N),
	(N = 0, choose_random_piece(X),
			piece_exists(X),
			choose_random_position(P),
			assert(randommovetype(1)),
			assert(piecetype(X)),
			assert(pieceposition(0)),
			assert(targetposition(P)),
			!;
	(N = 1, choose_first_possible_move(P1, P2, V1, V2),
			check_creates_tower(V1, V2, _),
			assert(randommovetype(2)),
			assert(piecetype('0')),
			assert(pieceposition(P1)),
			assert(targetposition(P2)),
			!));
	choose_random_move.