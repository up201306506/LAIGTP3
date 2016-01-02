display_time(0) :- write('\n'), !.
display_time(P) :-
	terminated(0),
	format('Round 2 starts in ~w...\n', [P]),
	flush_output,
	sleep(1),
	P1 is P - 1,
	display_time(P1), !;
	terminated(1).

display_winner :-
	terminated(0),
	points_player_1(P1),
	points_player_2(P2),
	retract_everything,
	assert_everything,
	write('GAME OVER!\n'),
	(P1 > P2, format('PLAYER 1: ~w\nPLAYER 2: ~w\nWINNER: PLAYER 1!\n', [P1, P2]), !;
	(P2 > P1, format('PLAYER 1: ~w\nPLAYER 2: ~w\nWINNER: PLAYER 2!\n', [P1, P2]), !;
	(P1 = P2, write('DRAW!\n'))));
	terminated(1),
	retract_everything,
	assert_everything,
	write('GAME ENDED!\n').

display_round :-
	round(1),
	write('                    ROUND 1'), !;
	round(2),
	write('                    ROUND 2').

display_players :-
	player_1(N11, N12, N13),
	player_2(N21, N22, N23),
	write('\n|      PLAYER 1      |  |      PLAYER 2      |\n'),
	format('|  Small Pieces:  ~w  |  |  Small Pieces:  ~w  |\n', [N11, N21]),
	format('|  Medium Pieces: ~w  |  |  Medium Pieces: ~w  |\n', [N12, N22]),
	format('|  Big Pieces:    ~w  |  |  Big Pieces:    ~w  |\n', [N13, N23]).

display_turn :-
	turn(pl1),
	write('\nTurn: PLAYER 1\n'), !;
	turn(pl2),
	write('\nTurn: PLAYER 2\n').

display_info :-
	terminated(0),
	display_round,
	display_players,
	display_board,
	display_turn, !;
	terminated(1).

display_line_1(C) :-
	(C = cell(_, 0), write(' ___/   \\___\n'), !;
	(C = cell(_, 1), write(' ___/ . \\___\n'), !;
	(C = cell(_, 2), write(' ___/ o \\___\n'), !;
	(C = cell(_, 3), write(' ___/ @ \\___\n'), !;
	(C = cell(_, 5), write(' ___/( )\\___\n'), !;
	(C = cell(_, 6), write(' ___/(.)\\___\n'), !;
	(C = cell(_, 7), write(' ___/(o)\\___\n'), !;
	(C = cell(_, 8), write(' ___/(@)\\___\n'), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).

display_line_2(C1, C2) :-
	var_a(A),
    (C1 = cell(_, 0), format('/   \\_~w_', [A]), !;
    (C1 = cell(_, 1), format('/ . \\_~w_', [A]), !;
    (C1 = cell(_, 2), format('/ o \\_~w_', [A]), !;
    (C1 = cell(_, 3), format('/ @ \\_~w_', [A]), !;
    (C1 = cell(_, 5), format('/( )\\_~w_', [A]), !;
    (C1 = cell(_, 6), format('/(.)\\_~w_', [A]), !;
    (C1 = cell(_, 7), format('/(o)\\_~w_', [A]), !;
    (C1 = cell(_, 8), format('/(@)\\_~w_', [A]), !)))))))),
    (C2 = cell(_, 0), write('/   \\\n'), !;
    (C2 = cell(_, 1), write('/ . \\\n'), !;
    (C2 = cell(_, 2), write('/ o \\\n'), !;
    (C2 = cell(_, 3), write('/ @ \\\n'), !;
    (C2 = cell(_, 5), write('/( )\\\n'), !;
    (C2 = cell(_, 6), write('/(.)\\\n'), !;
    (C2 = cell(_, 7), write('/(o)\\\n'), !;
    (C2 = cell(_, 8), write('/(@)\\\n'), !)))))))),
    C1 = cell(X,_), retract(var_a(_)), assert(var_a(X)),
	C2 = cell(Y,_), retract(var_b(_)), assert(var_b(Y)).

display_line_3(C) :-
	var_a(A), var_b(B),
	(C = cell(_, 0), format('\\_~w_/   \\_~w_/\n', [A, B]), !;
	(C = cell(_, 1), format('\\_~w_/ . \\_~w_/\n', [A, B]), !;
	(C = cell(_, 2), format('\\_~w_/ o \\_~w_/\n', [A, B]), !;
	(C = cell(_, 3), format('\\_~w_/ @ \\_~w_/\n', [A, B]), !;
	(C = cell(_, 5), format('\\_~w_/( )\\_~w_/\n', [A, B]), !;
	(C = cell(_, 6), format('\\_~w_/(.)\\_~w_/\n', [A, B]), !;
	(C = cell(_, 7), format('\\_~w_/(o)\\_~w_/\n', [A, B]), !;
	(C = cell(_, 8), format('\\_~w_/(@)\\_~w_/\n', [A, B]), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).

display_line_4(C) :-
	(C = cell(_, 0), write('     ___/   \\\n'), !;
	(C = cell(_, 1), write('     ___/ . \\\n'), !;
	(C = cell(_, 2), write('     ___/ o \\\n'), !;
	(C = cell(_, 3), write('     ___/ @ \\\n'), !;
	(C = cell(_, 5), write('     ___/( )\\\n'), !;
	(C = cell(_, 6), write('     ___/(.)\\\n'), !;
	(C = cell(_, 7), write('     ___/(o)\\\n'), !;
	(C = cell(_, 8), write('     ___/(@)\\\n'), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).
 
display_line_5(C) :-
	var_a(A),
	(C = cell(_, 0), format(' ___/   \\_~w_/\n', [A]), !;
	(C = cell(_, 1), format(' ___/ . \\_~w_/\n', [A]), !;
	(C = cell(_, 2), format(' ___/ o \\_~w_/\n', [A]), !;
	(C = cell(_, 3), format(' ___/ @ \\_~w_/\n', [A]), !;
	(C = cell(_, 5), format(' ___/( )\\_~w_/\n', [A]), !;
	(C = cell(_, 6), format(' ___/(.)\\_~w_/\n', [A]), !;
	(C = cell(_, 7), format(' ___/(o)\\_~w_/\n', [A]), !;
	(C = cell(_, 8), format(' ___/(@)\\_~w_/\n', [A]), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).
 
display_line_6(C) :-
	var_a(A),
	(C = cell(_, 0), format('/   \\_~w_/\n', [A]), !;
	(C = cell(_, 1), format('/ . \\_~w_/\n', [A]), !;
	(C = cell(_, 2), format('/ o \\_~w_/\n', [A]), !;
	(C = cell(_, 3), format('/ @ \\_~w_/\n', [A]), !;
	(C = cell(_, 5), format('/( )\\_~w_/\n', [A]), !;
	(C = cell(_, 6), format('/(.)\\_~w_/\n', [A]), !;
	(C = cell(_, 7), format('/(o)\\_~w_/\n', [A]), !;
	(C = cell(_, 8), format('/(@)\\_~w_/\n', [A]), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).
 
display_line_7(C1, C2) :-
	var_a(A),
	(C1 = cell(_, 0), format(' ___/   \\_~w_', [A]), !;
	(C1 = cell(_, 1), format(' ___/ . \\_~w_', [A]), !;
	(C1 = cell(_, 2), format(' ___/ o \\_~w_', [A]), !;
	(C1 = cell(_, 3), format(' ___/ @ \\_~w_', [A]), !;
	(C1 = cell(_, 5), format(' ___/( )\\_~w_', [A]), !;
	(C1 = cell(_, 6), format(' ___/(.)\\_~w_', [A]), !;
	(C1 = cell(_, 7), format(' ___/(o)\\_~w_', [A]), !;
	(C1 = cell(_, 8), format(' ___/(@)\\_~w_', [A]), !)))))))),
	(C2 = cell(_, 0), write('/   \\___\n'), !;
	(C2 = cell(_, 1), write('/ . \\___\n'), !;
	(C2 = cell(_, 2), write('/ o \\___\n'), !;
	(C2 = cell(_, 3), write('/ @ \\___\n'), !;
	(C2 = cell(_, 5), write('/( )\\___\n'), !;
	(C2 = cell(_, 6), write('/(.)\\___\n'), !;
	(C2 = cell(_, 7), write('/(o)\\___\n'), !;
	(C2 = cell(_, 8), write('/(@)\\___\n'), !)))))))),
	C1 = cell(X,_), retract(var_a(_)), assert(var_a(X)),
	C2 = cell(Y,_), retract(var_b(_)), assert(var_b(Y)).
 
display_line_8(C1, C2, C3) :-
	var_a(A), var_b(B),
	(C1 = cell(_, 0), format('/   \\_~w_', [A]), !;
	(C1 = cell(_, 1), format('/ . \\_~w_', [A]), !;
	(C1 = cell(_, 2), format('/ o \\_~w_', [A]), !;
	(C1 = cell(_, 3), format('/ @ \\_~w_', [A]), !;
	(C1 = cell(_, 5), format('/( )\\_~w_', [A]), !;
	(C1 = cell(_, 6), format('/(.)\\_~w_', [A]), !;
	(C1 = cell(_, 7), format('/(o)\\_~w_', [A]), !;
	(C1 = cell(_, 8), format('/(@)\\_~w_', [A]), !)))))))),
	(C2 = cell(_, 0), format('/   \\_~w_', [B]), !;
	(C2 = cell(_, 1), format('/ . \\_~w_', [B]), !;
	(C2 = cell(_, 2), format('/ o \\_~w_', [B]), !;
	(C2 = cell(_, 3), format('/ @ \\_~w_', [B]), !;
	(C2 = cell(_, 5), format('/( )\\_~w_', [B]), !;
	(C2 = cell(_, 6), format('/(.)\\_~w_', [B]), !;
	(C2 = cell(_, 7), format('/(o)\\_~w_', [B]), !;
	(C2 = cell(_, 8), format('/(@)\\_~w_', [B]), !)))))))),
	(C3 = cell(_, 0), write('/   \\\n'), !;
	(C3 = cell(_, 1), write('/ . \\\n'), !;
	(C3 = cell(_, 2), write('/ o \\\n'), !;
	(C3 = cell(_, 3), write('/ @ \\\n'), !;
	(C3 = cell(_, 5), write('/( )\\\n'), !;
	(C3 = cell(_, 6), write('/(.)\\\n'), !;
	(C3 = cell(_, 7), write('/(o)\\\n'), !;
	(C3 = cell(_, 8), write('/(@)\\\n'), !)))))))),
	C1 = cell(X,_), retract(var_a(_)), assert(var_a(X)),
	C2 = cell(Y,_), retract(var_b(_)), assert(var_b(Y)),
	C3 = cell(Z,_), retract(var_c(_)), assert(var_c(Z)).
 
display_line_9(C1, C2) :-
	var_a(A), var_b(B), var_c(C),
	(C1 = cell(_, 0), format('\\_~w_/   \\_~w_', [A, B]), !;
	(C1 = cell(_, 1), format('\\_~w_/ . \\_~w_', [A, B]), !;
	(C1 = cell(_, 2), format('\\_~w_/ o \\_~w_', [A, B]), !;
	(C1 = cell(_, 3), format('\\_~w_/ @ \\_~w_', [A, B]), !;
	(C1 = cell(_, 5), format('\\_~w_/( )\\_~w_', [A, B]), !;
	(C1 = cell(_, 6), format('\\_~w_/(.)\\_~w_', [A, B]), !;
	(C1 = cell(_, 7), format('\\_~w_/(o)\\_~w_', [A, B]), !;
	(C1 = cell(_, 8), format('\\_~w_/(@)\\_~w_', [A, B]), !)))))))),
	(C2 = cell(_, 0), format('/   \\_~w_/\n', [C]), !;
	(C2 = cell(_, 1), format('/ . \\_~w_/\n', [C]), !;
	(C2 = cell(_, 2), format('/ o \\_~w_/\n', [C]), !;
	(C2 = cell(_, 3), format('/ @ \\_~w_/\n', [C]), !;
	(C2 = cell(_, 5), format('/( )\\_~w_/\n', [C]), !;
	(C2 = cell(_, 6), format('/(.)\\_~w_/\n', [C]), !;
	(C2 = cell(_, 7), format('/(o)\\_~w_/\n', [C]), !;
	(C2 = cell(_, 8), format('/(@)\\_~w_/\n', [C]), !)))))))),
	C1 = cell(X,_), retract(var_a(_)), assert(var_a(X)),
	C2 = cell(Y,_), retract(var_b(_)), assert(var_b(Y)).
 
display_line_10(C) :-
	var_a(A), var_b(B),
	(C = cell(_, 0), format('    \\_~w_/   \\_~w_/\n', [A, B]), !;
	(C = cell(_, 1), format('    \\_~w_/ . \\_~w_/\n', [A, B]), !;
	(C = cell(_, 2), format('    \\_~w_/ o \\_~w_/\n', [A, B]), !;
	(C = cell(_, 3), format('    \\_~w_/ @ \\_~w_/\n', [A, B]), !;
	(C = cell(_, 5), format('    \\_~w_/( )\\_~w_/\n', [A, B]), !;
	(C = cell(_, 6), format('    \\_~w_/(.)\\_~w_/\n', [A, B]), !;
	(C = cell(_, 7), format('    \\_~w_/(o)\\_~w_/\n', [A, B]), !;
	(C = cell(_, 8), format('    \\_~w_/(@)\\_~w_/\n', [A, B]), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).
 
display_line_11(C) :-
	(C = cell(_, 0), write('     ___/   \\___\n'), !;
	(C = cell(_, 1), write('     ___/ . \\___\n'), !;
	(C = cell(_, 2), write('     ___/ o \\___\n'), !;
	(C = cell(_, 3), write('     ___/ @ \\___\n'), !;
	(C = cell(_, 5), write('     ___/( )\\___\n'), !;
	(C = cell(_, 6), write('     ___/(.)\\___\n'), !;
	(C = cell(_, 7), write('     ___/(o)\\___\n'), !;
	(C = cell(_, 8), write('     ___/(@)\\___\n'), !)))))))),
	C = cell(X,_), retract(var_a(_)), assert(var_a(X)).

display_board_1 :-
	board([C1, C2, C3, C4, C5, C6, C7, C8, C9]),
	write('     ___\n'),
	display_line_1(C2),
	display_line_2(C1, C3),
	display_line_3(C5),
	display_line_2(C4, C6),
	display_line_3(C8),
	display_line_2(C7, C9),
	var_a(A), var_b(B),
	format('\\_~w_/   \\_~w_/\n', [A, B]), !.

display_board_2 :-
	board([C1, C2, C3, C4, C5, C6, C7, C8, C9]),
	write('         ___\n'),
	display_line_4(C3),
	display_line_5(C2),
	display_line_2(C1, C6),
	display_line_3(C5),
	display_line_2(C4, C9),
	display_line_3(C8),
	display_line_6(C7),
	var_a(A),
	format('\\_~w_/\n', [A]), !.

display_board_3 :-
	board([C1, C2, C3, C4, C5, C6, C7, C8, C9]),
	write('         ___\n'),
	display_line_11(C3),
	display_line_7(C2, C6),
	display_line_8(C1, C5, C9),
	display_line_9(C4, C8),
	display_line_10(C7),
	var_a(A),
	format('        \\_~w_/\n', [A]), !.

display_board :-
	chosen_board(1),
	display_board_1, !;
	chosen_board(2),
	display_board_2, !;
	chosen_board(3),
	display_board_3.

print_pieces :-
	write('\nSmall Piece: .\n'),
	write('Medium Piece: o\n'),
	write('Big Piece: ( )\n'),
	write('Small and Medium Pieces: @\n'),
	write('Small and Big Pieces: (.)\n'),
	write('Medium and Big Pieces: (o)\n'),
	write('Small, Medium and Big Pieces: (@)\n\n').

print_boards :-
	write('     (1)               (2) ___               (3)\n'),
	write('     ___               ___/ 3 \\              ___\n'),
	write(' ___/ 2 \\___       ___/ 2 \\___/          ___/ 3 \\___\n'),
	write('/ 1 \\___/ 3 \\     / 1 \\___/ 6 \\      ___/ 2 \\___/ 6 \\___\n'),
	write('\\___/ 5 \\___/     \\___/ 5 \\___/     / 1 \\___/ 5 \\___/ 9 \\\n'),
	write('/ 4 \\___/ 6 \\     / 4 \\___/ 9 \\     \\___/ 4 \\___/ 8 \\___/\n'),
	write('\\___/ 8 \\___/     \\___/ 8 \\___/         \\___/ 7 \\___/\n'),
	write('/ 7 \\___/ 9 \\     / 7 \\___/                 \\___/\n'),
	write('\\___/   \\___/     \\___/\n').